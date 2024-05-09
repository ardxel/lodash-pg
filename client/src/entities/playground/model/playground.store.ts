import { AsyncStore } from '@/shared/model';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

type IStdoutFromServer = {
  tests: Array<boolean | Error>;
};

export class PlaygroundStore extends AsyncStore {
  public code: string = '';
  public desc: string = '';
  public codeExamples: string[] = [];
  public inputExamples: unknown[] = [];
  public selectedLodashFn: string = 'join';
  public executionResult: IStdoutFromServer = { tests: [] };
  public implementedLodashMethodKeys: string[] = [];

  public changeCode(input: string): void {
    this.code = input;
  }

  public async getImplementedLodashMethodKeys(): Promise<void> {
    try {
      const implementedKeys = await this.fetchData<string[]>('/playground/api', 'GET');

      runInAction(() => {
        this.implementedLodashMethodKeys = implementedKeys;
      });
    } catch (E) {
      console.error(E);
    }
  }

  public async getEntity(lodashFnName: string): Promise<void> {
    try {
      const searchParams = new URLSearchParams();
      searchParams.set('lodash_fn_name', lodashFnName);

      const url = `/playground/api/entity?${searchParams}`;

      const data = await this.fetchData<any>(url, 'GET');
      console.log(data);
      runInAction(() => {
        this.code = data.defaultCode;
        this.desc = data.description;
        this.inputExamples = data.inputs;
        this.codeExamples = data.examples;
      });
    } catch (E) {
      console.error(E);
    }
  }

  public async executeCodeOnServer(): Promise<void> {
    try {
      const executedResult = await this.fetchData<IStdoutFromServer>('/playground/api', 'POST', {
        code: this.code,
        lodash_fn_name: this.selectedLodashFn,
      });

      runInAction(() => {
        this.executionResult = executedResult as IStdoutFromServer;
      });
    } catch (e) {
      console.error(e);
    }
  }

  get output() {
    return {
      error: this.error,
      testResuts: this.executionResult.tests,
    };
  }

  constructor() {
    super();

    makeObservable(this, {
      implementedLodashMethodKeys: observable,
      selectedLodashFn: observable,
      executionResult: observable,
      code: observable,

      getEntity: action,
      getImplementedLodashMethodKeys: action,
      executeCodeOnServer: action,
      changeCode: action,

      output: computed,
    });
  }
}
