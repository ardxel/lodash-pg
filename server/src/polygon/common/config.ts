import { mkdirSync, statSync } from "fs";
import { LoDashStatic, isFunction, pickBy } from "lodash";
import * as path from "path";

type FSError = Error & { code: string };

type IPolygonConfig = Readonly<{
    tempDir: string;
    rootDir: string;
    lodashFnSet: Set<string>;
}>;

class PolygonConfig {
    private isExistsDir(path: string): boolean {
        try {
            const dirStats = statSync(path);
            return dirStats.isDirectory();
        } catch (e) {
            if ((e as FSError).code === "ENOENT") {
                return false;
            }
            throw e;
        }
    }

    private getTempDir(): string {
        const tmpDirPath = path.join(process.cwd(), "./dist", "./tmp");
        const tmpDirExists = this.isExistsDir(tmpDirPath);

        if (tmpDirExists) return tmpDirPath;

        mkdirSync(tmpDirPath);

        return this.getTempDir();
    }

    private getRootDir(): string {
        const rootDirPath = path.join(process.cwd(), "./dist");

        return rootDirPath;
    }

    private getLodashFnSet() {
        const lodashAPI = require("lodash");
        const lodashFnMap = pickBy<LoDashStatic>(lodashAPI, (value) => isFunction(value));
        const lodashFnKeysLower = Object.keys(lodashFnMap).map((name) => name.toLowerCase());

        return new Set(lodashFnKeysLower);
    }

    public toObject(): IPolygonConfig {
        const config = {
            tempDir: this.getTempDir(),
            rootDir: this.getRootDir(),
            lodashFnSet: this.getLodashFnSet(),
        } as const;

        return config;
    }
}

const pconfig = new PolygonConfig();

export default pconfig.toObject();
