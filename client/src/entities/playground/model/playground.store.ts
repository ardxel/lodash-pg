import { AsyncStore } from '@/shared/model';
import { url } from 'inspector';
import { action, makeObservable, observable, runInAction, computed } from 'mobx';

type IStdoutFromServer = {
  tests: Array<boolean | Error>;
};

export class PlaygroundStore extends AsyncStore {
  public code: string = `module.exports = function(array, sep) {
	return array.join(sep);
}`;
  public selectedLodashFn: string = 'join';
  public executionResult: IStdoutFromServer = { tests: [] };
  public implementedLodashMethodKeys: string[] = [];

  public changeCode(input: string): void {
    this.code = input;
  }

  public async getImplementedLodashMethodKeys() {
    try {
      const implementedKeys = await this.fetchData<string[]>('/api', 'GET');

      runInAction(() => {
        this.implementedLodashMethodKeys = implementedKeys;
      });
    } catch (E) {
      console.error(E);
    }
  }

  public async generateDefaultCodeByLodashFnKey(lodashFnName: string) {
    try {
      const url = `/api/generate?lodash_fn_name=${lodashFnName}`;

      const { generatedCode } = await this.fetchData<{ generatedCode: string }>(url, 'GET');

      runInAction(() => {
        this.code = generatedCode;
      });
    } catch (E) {
      console.error(E);
    }
  }

  public async executeCodeOnServer() {
    try {
      const executedResult = await this.fetchData<IStdoutFromServer>('/api', 'POST', {
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

      generateDefaultCodeByLodashFnKey: action,
      getImplementedLodashMethodKeys: action,
      executeCodeOnServer: action,
      changeCode: action,

      output: computed,
    });
  }
}
