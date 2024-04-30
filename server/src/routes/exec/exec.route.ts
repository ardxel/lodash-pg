import { RoutesConfig } from "common/Router.abstract";
import { Application } from "express";

export class ExecuteRoute extends RoutesConfig {
    constructor(app: Application) {
        super(app, "execute");
    }
    configureRoutes(): Application {
        this.app.get("/test", (req, res) => {
            res.json({ data: "Hello world!" });
        });

        return this.app;
    }
}
