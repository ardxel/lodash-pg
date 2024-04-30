export abstract class RoutesConfig<Inst = import("express").Application> {
    protected readonly app: Inst;
    public readonly name: string;

    constructor(app: Inst, name: string) {
        this.app = app;
        this.name = name;

        this.configureRoutes();
    }

    abstract configureRoutes(): Inst;
}
