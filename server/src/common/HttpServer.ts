import express, { Application, Express, Handler } from "express";
import { AppConfig } from "./Config.abstract";
import { RoutesConfig } from "./Router.abstract";

export abstract class HttpServer {
    private _app: Express;
    private _config: AppConfig;

    constructor(expressInstance: typeof express, appConfig: AppConfig) {
        this._app = expressInstance();
        this._config = appConfig;
    }

    abstract configureRoutes(): void;
    abstract configureMiddlewares(): void;

    public useRoute(RouteConfig: new (app: Application) => RoutesConfig): void {
        new RouteConfig(this._app);
    }

    public start(): void {
        const port = this._config.get("PORT");
        this._app.listen(port, () => {
            console.log("Server listen in " + port + " port");
        });
    }

    public useMV(handler: Handler): void {
        this._app.use(handler);
    }
}
