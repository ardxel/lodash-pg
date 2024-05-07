import { action, makeAutoObservable, makeObservable, observable, runInAction } from 'mobx';

export class AsyncStore {
  public isLoading = false;
  public error: Error | null = null;

  async fetchData<T extends unknown>(url: string, method: string, body?: Record<string, any>): Promise<T> {
    this.isLoading = false;
    this.error = null;
    try {
      const response = await fetch(url, { body: body ? JSON.stringify(body) : undefined, method });

      const result = await response.json();

      runInAction(() => {
        this.isLoading = false;
        this.error = null;
      });

      return result;
    } catch (e) {
      runInAction(() => {
        this.isLoading = false;
        this.error = e as Error;
      });

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
