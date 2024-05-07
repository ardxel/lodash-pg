import { LodashFunctions } from "polygon/types";
import { LodashTestObject } from "./types";

type LodashFunctionsKeys = keyof LodashFunctions;

export class LodashTestBuilder<T extends LodashFunctionsKeys> {
    private readonly TESTCASES_MIN_LENGTH = 3;
    private hasMinimunLengthOfTests: boolean;
    private hasArguments: boolean;
    private hasReturnType: boolean;
    private _object: LodashTestObject;
    private _fnName: string;

    constructor(fnName: T) {
        this._fnName = fnName;

        this.hasMinimunLengthOfTests = false;
        this.hasArguments = false;
        this.hasReturnType = false;

        this._object = {
            testCases: [],
            arguments: [],
            returnType: null,
        };
    }

    public addTest(userInput: unknown[], expectedResult: unknown): this {
        this._object.testCases.push({ input: userInput, expected: expectedResult });
        if (this._object.testCases.length === this.TESTCASES_MIN_LENGTH) {
            this.hasMinimunLengthOfTests = true;
        }
        return this;
    }

    public addArgs(name: string, type: string): this {
        this._object.arguments.push({ name, type });
        this.hasArguments = true;
        return this;
    }

    public setReturnType(type: string): this {
        this._object.returnType = type;
        this.hasReturnType = true;
        return this;
    }

    public toObject(): LodashTestObject {
        if (!this.hasMinimunLengthOfTests) {
            throw new Error(
                `Test cases for ${this._fnName} should have at least ${this.TESTCASES_MIN_LENGTH} tests, but found ${this._object.testCases.length}`,
            );
        }

        if (!this.hasArguments) {
            throw new Error(`Arguments for the function ${this._fnName} are not defined`);
        }

        if (!this.hasReturnType) {
            throw new Error(`Return type for ${this._fnName} is not defined`);
        }

        return this._object;
    }
}

export class LodashTestManager {
    private _testObject: Record<string, LodashTestBuilder<LodashFunctionsKeys>>;

    constructor() {
        this._testObject = {};
    }

    public addFunc<T extends LodashFunctionsKeys>(name: LodashFunctionsKeys): LodashTestBuilder<T> {
        this._testObject[name] = new LodashTestBuilder(name);
        return this._testObject[name];
    }

    public getObjectAsMap(): Map<LodashFunctionsKeys, LodashTestObject> {
        const result = new Map();

        for (const lodashFnName in this._testObject) {
            result.set(lodashFnName, this._testObject[lodashFnName].toObject());
        }

        return result;
    }
}
