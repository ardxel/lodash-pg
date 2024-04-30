import dotenv from "dotenv";
import { IAppConfig } from "common/interfaces";

dotenv.config();

export abstract class AppConfig {
    private object: IAppConfig;

    constructor() {
        this.object = this.load() as IAppConfig;
        this.validateWithException(this.object);
    }

    private validateWithException(obj: IAppConfig): void {
        const emptyKeys = Object.entries(obj)
            .filter(([_, value]) => !value)
            .map((entry) => entry[0])
            .join(", ");

        if (emptyKeys.length) {
            throw new Error("Raw variables found: " + emptyKeys);
        }
    }

    abstract load(): { [K in keyof IAppConfig]: IAppConfig[K] | undefined };

    get<T extends keyof IAppConfig>(envName: T): IAppConfig[T] | string {
        return this.object[envName];
    }
}
