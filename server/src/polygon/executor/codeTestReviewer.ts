import * as path from "path";

import { exec as execWithCallback } from "node:child_process";
import * as util from "node:util";
import { config } from "polygon/common";
import testCases, { ImplementedLodashFn } from "../test-cases";
import { LodashFunctions } from "../types";

const execAsync = util.promisify(execWithCallback);

export type TestingResult = {
    tests: (boolean | Error)[];
    criticalError: string | null;
};

export class CodeTestReviewer {
    private readonly testCasesMap = testCases;
    private readonly execScriptPath = path.join(process.cwd(), "./scripts/execTempFn.js");

    public async testFn<T extends ImplementedLodashFn | keyof LodashFunctions>(
        tempFilePath: string,
        lodashFnName: T,
    ): Promise<TestingResult> {
        let testingResult: TestingResult = {
            tests: [false, false, false],
            criticalError: null,
        };

        try {
            const cmd = ["node", this.execScriptPath, tempFilePath].join(" ");
            const fnArgs = JSON.stringify(this.testCasesMap["join"].map((c) => c.input));
            const expectedFnResult = JSON.stringify(this.testCasesMap["join"].map((c) => c.expected));

            const env = Object.assign(process.env, {
                fnArgs,
                expectedFnResult,
            });

            const { stdout, stderr } = await execAsync(cmd, { env });

            console.error(stderr);

            testingResult = JSON.parse(stdout);

            return testingResult;
        } catch (E) {
            console.error(E);
            return testingResult;
        }
    }
}
