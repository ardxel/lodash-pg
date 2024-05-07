import { ModuleConfig } from "polygon/common";
import { LodashFunctions } from "polygon/types";
import { CodeTestReviewer, TestingResult } from "./codeTestReviewer";

export class CodeExecutor extends ModuleConfig {
    private readonly codeTestReviewer = new CodeTestReviewer();

    public execute<T extends keyof LodashFunctions>(code: string, lodashFnName: T): Promise<TestingResult> {
        return this.codeTestReviewer.testCode(code, lodashFnName);
    }
}
