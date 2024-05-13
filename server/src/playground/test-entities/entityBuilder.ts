import { LodashEntity, LodashFunctions } from "playground";

type LodashFunctionsKeys = keyof LodashFunctions;

const TESTCASES_MIN_LENGTH = 3;

export class LodashTestBuilder<T extends LodashFunctionsKeys> {
    private _fnName: string;
    private _testCases: LodashEntity["testCases"] = [];
    private _arguments: LodashEntity["arguments"] = [];
    private _examples: LodashEntity["examples"] = [];
    private _returnType: LodashEntity["returnType"] = "";
    private _description: LodashEntity["description"] = "";

    constructor(fnName: T) {
        this._fnName = fnName;
    }

    public addTest(userInput: unknown[], expectedResult: unknown): this {
        this._testCases.push({ input: userInput, expected: expectedResult });
        return this;
    }

    public addDescription(text: string): this {
        this._description = text;
        return this;
    }

    public addExample(text: string): this {
        this._examples.push(text);
        return this;
    }

    public addArgs(name: string, type: string): this {
        this._arguments.push({ name, type });
        return this;
    }

    public setReturnType(type: string): this {
        this._returnType = type;
        return this;
    }

    public asObject(): LodashEntity {
        if (this._testCases.length < TESTCASES_MIN_LENGTH) {
            throw new Error(
                `Test cases for ${this._fnName} should have at least ${TESTCASES_MIN_LENGTH} tests, but found ${this._testCases.length}`,
            );
        }

        if (!this._arguments.length) {
            throw new Error(`Arguments for the function ${this._fnName} are not defined`);
        }

        if (!this._returnType) {
            throw new Error(`Return type for ${this._fnName} is not defined`);
        }

        if (!this._description) {
            throw new Error(`Description for ${this._fnName} is not defined`);
        }

        if (!this._examples.length) {
            throw new Error(`Examples for the function ${this._fnName} are not defined`);
        }

        return {
            testCases: this._testCases,
            arguments: this._arguments,
            returnType: this._returnType,
            description: this._description,
            examples: this._examples,
        };
    }
}

export class LodashTestManager {
    private _entities: Record<string, LodashTestBuilder<LodashFunctionsKeys>> = {};

    public addEntity<T extends LodashFunctionsKeys>(name: LodashFunctionsKeys): LodashTestBuilder<T> {
        this._entities[name] = new LodashTestBuilder(name);
        return this._entities[name];
    }

    public asMap(): Record<LodashFunctionsKeys, LodashEntity> {
        const map = {};

        for (const lodashFnName in this._entities) {
            map[lodashFnName] = this._entities[lodashFnName].asObject();
        }

        return map as Record<LodashFunctionsKeys, LodashEntity>;
    }
}
