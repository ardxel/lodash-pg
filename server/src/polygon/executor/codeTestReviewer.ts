import * as isolatedVM from "isolated-vm";
import * as assert from "node:assert";
import { serializeError } from "serialize-error";

import { TestMapper } from "polygon/testMapper";
import { LodashFunctions } from "../types";
import { CodeGenerator } from "./codeGenerator";

export type TestingResult = {
    unexpectedError: boolean;
    result: (boolean | Error)[];
};

export class CodeTestReviewer {
    private readonly TEST_FN_NAME = "test";
    private readonly ISOLATE_MEMORY_LIMIT = 32;
    private readonly testMapper = TestMapper;
    private readonly codeGenerator: CodeGenerator = new CodeGenerator();

    public async testCode<T extends keyof LodashFunctions>(code: string, lodashFnName: T): Promise<TestingResult> {
        let environment;
        let result;
        let testLength = 3;

        try {
            // it will throw an syntax error if code is not valid
            new Function(code);

            environment = await this.compileIsolatedEnvironment(code, lodashFnName);

            await environment.script.run(environment.context);

            const testFn = await environment.context.global.get(this.TEST_FN_NAME);
            const testCases = this.testMapper.get(lodashFnName).testCases;
            testLength = testCases.length;
            result = testFn(testCases);

            return {
                unexpectedError: false,
                result,
            };
        } catch (E) {
            const getSerializableError = () => serializeError(E);

            if (E instanceof SyntaxError) {
                return {
                    unexpectedError: true,
                    result: new Array(testLength).fill(getSerializableError()),
                };
            }
            // TODO:
            return {
                unexpectedError: false,
                result: [false, false, false],
            };
        } finally {
            if (environment) {
                environment.isolate.dispose();
            }
        }
    }

    private async compileIsolatedEnvironment(userCode: string, lodashFnName: string) {
        try {
            const isolate = new isolatedVM.Isolate({ memoryLimit: this.ISOLATE_MEMORY_LIMIT });

            const context = await isolate.createContext();

            await context.global.set("serializeError", serializeError);
            await context.global.set("strictEqual", assert.strictEqual);
            await context.global.set("equal", assert.equal);

            const code = [userCode, this.codeGenerator.generateTestingCode(lodashFnName)].join("\n");

            const script = await isolate.compileScript(code);

            return {
                context,
                script,
                isolate,
            };
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
