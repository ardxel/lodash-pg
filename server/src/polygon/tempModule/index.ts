import { unlink, writeFile } from "fs/promises";
import * as path from "path";
import { ModuleConfig } from "polygon/common";
import { LodashFunctions } from "polygon/types";
import { nanoid } from "nanoid";

export class TempModuleManager extends ModuleConfig {
    constructor() {
        super();
    }

    public async createTempModule(code: string, lodashFnName: keyof LodashFunctions): Promise<TempModule> {
        const tempModule = new TempModule(code, lodashFnName);
        const tempModuleFilePath = tempModule.getFilePath();
        const tempModuleCode = tempModule.getCode();

        try {
            await writeFile(tempModuleFilePath, tempModuleCode);

            return tempModule;
        } catch (E) {
            console.log(E);

            return tempModule;
        }
    }

    public async removeTempModule(tempModule: TempModule): Promise<boolean> {
        try {
            await unlink(tempModule.getFilePath());
            return true;
        } catch (E) {
            return false;
        }
    }
}

export class TempModule extends ModuleConfig {
    private generatedFileName: string;
    private generatedFilePath: string;
    private code: string;
    private lodashFnName: keyof LodashFunctions;

    constructor(code: string, lodashFnName: keyof LodashFunctions) {
        super();
        this.code = code;
        this.lodashFnName = lodashFnName;
        this.generatedFileName = nanoid(10) + ".js";
        this.generatedFilePath = path.join(this.tempDir, this.generatedFileName);
    }

    public getFileName(): string {
        return this.generatedFileName;
    }
    public getFilePath(): string {
        return this.generatedFilePath;
    }
    public getCode(): string {
        return this.code;
    }

    public getLodashFnName(): string {
        return this.lodashFnName;
    }
}
export { ModuleConfig };
