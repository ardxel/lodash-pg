import * as path from "path";

type IPolygonConfig = Readonly<{
    rootDir: string;
}>;

class PolygonConfig {
    private readonly NODE_ENV = process.env.NODE_ENV;

    private isDev() {
        return this.NODE_ENV === "development";
    }

    private getRootDir(): string {
        const rootDirPath = this.isDev() ? path.join(process.cwd(), "./dist") : path.join(process.cwd());

        return rootDirPath;
    }

    public toObject(): IPolygonConfig {
        const config = {
            rootDir: this.getRootDir(),
        } as const;

        return config;
    }
}

const pconfig = new PolygonConfig();

export default pconfig.toObject();
