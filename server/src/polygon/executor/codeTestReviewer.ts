import isolatedVM from "isolated-vm";
import * as assert from "node:assert";
import { serializeError } from "serialize-error";

import { TestMapper } from "polygon/testMapper";
import { LodashFunctions } from "../types";
import { CodeGenerator } from "./codeGenerator";

export type TestingResult = {
    testResults: (boolean | Error)[];
};

export class CodeTestReviewer {
    private readonly TEST_FN_NAME = "test";
    private readonly ISOLATE_MEMORY_LIMIT = 32;
    private readonly testMapper = TestMapper;
    private readonly codeGenerator: CodeGenerator = new CodeGenerator();

    public async testCode<T extends keyof LodashFunctions>(code: string, lodashFnName: T): Promise<TestingResult> {
        const environment = await this.compileIsolatedEnvironment(code, lodashFnName);

        try {
            await environment.script.run(environment.context);
            const testFn = await environment.context.global.get(this.TEST_FN_NAME);

            const result = testFn(this.testMapper.get(lodashFnName).testCases);

            return result;
        } catch (E) {
            console.error(E);
            const serializableError = serializeError(E);
            return {
                testResults: new Array(this.testMapper.get(lodashFnName).testCases.length).fill(serializableError),
            };
        } finally {
            environment.isolate.dispose();
        }
    }

    private async compileIsolatedEnvironment(userCode: string, lodashFnName: string) {
        const isolate = new isolatedVM.Isolate({ memoryLimit: this.ISOLATE_MEMORY_LIMIT });
        const context = await isolate.createContext();

        await context.global.set("strictEqual", assert.strictEqual);
        await context.global.set("equal", assert.equal);
        await context.global.set("serializeError", serializeError);

        const code = [userCode, this.codeGenerator.generateTestingCode(lodashFnName)].join("\n");

        const script = await isolate.compileScript(code);

        return {
            context,
            script,
            isolate,
        };
    }
}
