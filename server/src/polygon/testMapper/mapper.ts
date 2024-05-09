import { LoDashStatic, isFunction, pickBy } from "lodash";
import lodashTestMap, { LodashTestMap } from "./testsMap";

function extractLodashKeys(): string[] {
    const lodashFnMap = pickBy<LoDashStatic>(require("lodash"), (value) => isFunction(value));
    const lodashFnKeysLower = Object.keys(lodashFnMap).map((name) => name.toLowerCase());

    return lodashFnKeysLower;
}

export class TestMapper {
    private static _testMap: LodashTestMap = lodashTestMap;
    private static _lodashKeys: Set<string> = new Set(extractLodashKeys());
    private static _lodashKeysImplemented: Set<string> = new Set(this._testMap.getKeys());

    private constructor() {}

    public static get(lodashFnName: string) {
        if (this.has(lodashFnName)) return this._testMap.get(lodashFnName);
    }

    public static has(lodashFnName: string): boolean {
        return this._lodashKeysImplemented.has(lodashFnName);
    }

    public static asArray(): string[] {
        return Array.from(this._lodashKeys);
    }

    public static asArrayImplemented(): string[] {
        return Array.from(this._lodashKeysImplemented);
    }
}
