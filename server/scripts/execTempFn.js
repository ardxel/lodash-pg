const assert = require("node:assert");
const isFunction = require("lodash/isFunction");
const processArgs = process.argv.slice(2);
const print = console.log;

/**
 * @param {string} modulePath
 * @param {any[][]} fnArgs
 * @param {any[][]} expectedFnResult
 * @param {(args: any) => void} end
 * @returns {void}
 */
function stdinExecutionResult(
    modulePath = processArgs[0],
    fnArgs = JSON.parse(process.env.fnArgs),
    expectedFnResult = JSON.parse(process.env.expectedFnResult),
    end = (args) => print(JSON.stringify(args)),
) {
    const defaultFn = require(modulePath);

    const result = { tests: [], criticalError: null };

    if (!isFunction(defaultFn)) {
        result.tests = new Array(fnArgs.length).fill(false);
        result.tests = "Default export should be a function";
        end(result);
        return;
    }

    result.tests = fnArgs.map((args, index) => {
        try {
            const defaultFnOutput = defaultFn(...args);
            assert.equal(defaultFnOutput, expectedFnResult[index]);
            return true;
        } catch (e) {
            return e;
        }
    });

    end(result);
}

stdinExecutionResult();
