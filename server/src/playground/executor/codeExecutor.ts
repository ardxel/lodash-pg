import { ModuleConfig } from "playground/common";
import { CodeTestReviewer, TestingResult } from "./codeTestReviewer";
import { LodashFunctions } from "playground";

export class CodeExecutor extends ModuleConfig {
    private readonly codeTestReviewer = new CodeTestReviewer();

    public execute<T extends keyof LodashFunctions>(code: string, lodashFnName: T): Promise<TestingResult> {
        return this.codeTestReviewer.testCode(code, lodashFnName);
    }
}
