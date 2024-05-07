import { LoDashStatic, isFunction, pickBy } from "lodash";
import { ModuleConfig } from "polygon/common";
import lodashTestMap, { LodashTestMap } from "./testsMap";

function extractLodashKeys(): string[] {
    const lodashFnMap = pickBy<LoDashStatic>(require("lodash"), (value) => isFunction(value));
    const lodashFnKeysLower = Object.keys(lodashFnMap).map((name) => name.toLowerCase());

    return lodashFnKeysLower;
}

export class TestMapper extends ModuleConfig {
    private _testMap: LodashTestMap;
    private _lodashKeys: Set<string>;
    private _lodashKeysImplemented: Set<string>;

    constructor() {
        super();

        this._testMap = lodashTestMap;

        this._lodashKeys = new Set(extractLodashKeys());

        this._lodashKeysImplemented = new Set(this._testMap.getKeys());
    }

    public get(lodashFnName: string) {
        if (this.has(lodashFnName)) return this._testMap.get(lodashFnName);
    }

    public has(lodashFnName: string): boolean {
        return this._lodashKeysImplemented.has(lodashFnName);
    }

    public asArray(): string[] {
        return Array.from(this._lodashKeys);
    }

    public asArrayImplemented(): string[] {
        return Array.from(this._lodashKeysImplemented);
    }
}

export const testMapper = new TestMapper();
