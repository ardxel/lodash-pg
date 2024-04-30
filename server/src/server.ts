import { AppConfig } from "common/Config.abstract";
import { HttpServer } from "common/HttpServer";
import { config } from "config";
import express from "express";
import { notFound } from "middleware";
import { ExecuteRoute } from "routes/exec";

class AppServer extends HttpServer {
    constructor(instance: typeof express, appConfig: AppConfig) {
        super(instance, appConfig);
    }

    configureRoutes() {
        this.useRoute(ExecuteRoute);
    }

    configureMiddlewares(): void {
        this.useMV(express.json());
        this.useMV(notFound);
    }
}

export default new AppServer(express, config);
