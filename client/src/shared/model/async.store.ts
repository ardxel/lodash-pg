import { action, makeAutoObservable, makeObservable, observable, runInAction } from 'mobx';

export class AsyncStore {
  public isLoading = false;
  public error: Error | null = null;

  async fetchData<T extends unknown>(url: string, method: string, body?: Record<string, any>): Promise<T> {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });
    try {
      const response = await fetch(url, { body: body ? JSON.stringify(body) : undefined, method });

      const result = await response.json();

      return result;
    } catch (e) {
      throw e;
    }
  }

  constructor() {
    makeObservable(this, {
      error: observable,
      isLoading: observable,
      fetchData: action,
    });
  }
}
