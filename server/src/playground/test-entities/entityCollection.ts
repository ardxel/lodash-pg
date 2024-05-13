import { LoDashStatic, isFunction, pickBy } from "lodash";
import { configureLodashTestEntityMap } from "./entitiesConfig";
import { LodashEntity } from "playground";

function extractLodashKeys(): string[] {
    const lodashFnMap = pickBy<LoDashStatic>(require("lodash"), (value) => isFunction(value));
    const lodashFnKeysLower = Object.keys(lodashFnMap).map((name) => name.toLowerCase());

    return lodashFnKeysLower;
}

export class LodashEntityCollection {
    private static _entityMap = configureLodashTestEntityMap();
    private static _lodashKeys: Set<string> = new Set(extractLodashKeys());
    private static _lodashKeysImplemented: Set<string> = new Set(Object.keys(this._entityMap));

    private constructor() {}

    public static get(lodashFnName: string): LodashEntity | undefined {
        if (this.has(lodashFnName)) return this._entityMap[lodashFnName];
    }

    public static has(lodashFnName: string): boolean {
        return this._lodashKeysImplemented.has(lodashFnName);
    }

    public static getKeysAsArray(): string[] {
        return Array.from(this._lodashKeys);
    }

    public static getImplementedKeysAsArray(): string[] {
        return Array.from(this._lodashKeysImplemented);
    }
}
