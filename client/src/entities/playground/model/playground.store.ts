import { AsyncStore } from '@/shared/model';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { deserializeError, isErrorLike } from 'serialize-error';

const wait = (ms: number) => new Promise((r) => setTimeout(() => r(1), ms));

type ExecutionResult = {
  unexpectedError: boolean;
  result: (boolean | Error)[];
};

export class PlaygroundStore extends AsyncStore {
  /* Execution code properties  */
  public isExecutionLoading: boolean = false;
  public executionResult: ExecutionResult['result'] = [];
  public code: string = '';

  /* Selected lodash testing entity properties */
  public desc: string = '';
  public codeExamples: string[] = [];
  public inputExamples: unknown[] = [];
  public selectedLodashFn: string = '';

  /* Default lodash method names for ui selector */
  public implementedLodashMethodKeys: string[] = [];

  public changeCode(input: string): void {
    this.code = input;
  }

  public selectLodashFn = (lodashFn: string) => {
    this.selectedLodashFn = lodashFn;
  };

  public async getImplementedLodashMethodKeys(): Promise<void> {
    try {
      const implementedKeys = await this.fetchData<string[]>('/playground/api', 'GET');

      runInAction(() => {
        this.implementedLodashMethodKeys = implementedKeys;
      });
    } catch (E) {
      console.error(E);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async getEntity(): Promise<void> {
    try {
      const searchParams = new URLSearchParams();
      searchParams.set('lodash_fn_name', this.selectedLodashFn);

      const url = `/playground/api/entity?${searchParams}`;

      const data = await this.fetchData<any>(url, 'GET');

      runInAction(() => {
        this.code = data.defaultCode;
        this.desc = data.description;
        this.inputExamples = data.inputs;
        this.codeExamples = data.examples;
      });
    } catch (E) {
      console.error(E);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async executeCodeOnServer(): Promise<void> {
    runInAction(() => {
      this.isExecutionLoading = true;
    });
    try {
      const executionResult = await this.fetchData<ExecutionResult>('/playground/api', 'POST', {
        code: this.code,
        lodash_fn_name: this.selectedLodashFn,
      });

      await wait(10000);

      if (executionResult.unexpectedError) {
        const firstErrorLike = executionResult.result.find((maybeError) => isErrorLike(maybeError));

        if (firstErrorLike) {
          runInAction(() => {
            this.error = deserializeError(firstErrorLike);
            this.executionResult = executionResult.result;
          });
        }
        return;
      }

      runInAction(() => {
        this.executionResult = executionResult.result;
        this.error = null;
      });
    } catch (e) {
      console.error(e);
      this.error = e as Error;
    } finally {
      runInAction(() => {
        this.isExecutionLoading = false;
        this.isLoading = false;
      });
    }
  }

  get output() {
    return {
      error: this.error,
      testResuts: this.executionResult,
    };
  }

  constructor() {
    super();

    makeObservable(this, {
      implementedLodashMethodKeys: observable,
      selectedLodashFn: observable,
      executionResult: observable,
      inputExamples: observable,
      codeExamples: observable,
      code: observable,
      desc: observable,

      getImplementedLodashMethodKeys: action,
      executeCodeOnServer: action,
      selectLodashFn: action,
      changeCode: action,
      getEntity: action,

      output: computed,
    });
  }
}
