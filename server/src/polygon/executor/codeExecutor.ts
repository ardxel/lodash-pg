import { ModuleConfig, TempModuleManager } from "polygon/tempModule";
import { CodeTestReviewer, TestingResult } from "./codeTestReviewer";
import { LodashFunctions } from "polygon/types";

export class CodeExecutor extends ModuleConfig {
    private readonly tempModuleManager = new TempModuleManager();
    private readonly codeTestReviewer = new CodeTestReviewer();

    public async execute<T extends keyof LodashFunctions>(code: string, lodashFnName: T): Promise<TestingResult> {
        const tempModule = await this.tempModuleManager.createTempModule(code, lodashFnName);
        const tempModuleFilePath = tempModule.getFilePath();

        const testingResult = await this.codeTestReviewer.testFn(tempModuleFilePath, lodashFnName);

        await this.tempModuleManager.removeTempModule(tempModule);

        return testingResult;
    }
}
