import { LodashTestManager } from "./builder";
import { LodashTestObject } from "./types";

export class LodashTestMap {
    private _map: Map<string, LodashTestObject>;

    public get(lodashFN: string): LodashTestObject {
        return this._map.get(lodashFN);
    }

    public has(lodashFN: string): boolean {
        return this._map.has(lodashFN);
    }

    public getKeys(): string[] {
        return Array.from(this._map.keys());
    }

    private _init() {
        const _ = new LodashTestManager();

        // https://lodash.com/docs/#join
        // prettier-ignore
        _.addFunc("join")	
            .addTest([[1, 2, 3, 4, 5], ","], "1,2,3,4,5")
            .addTest([["a", "b", "c"], ""], "abc")
            .addTest([["foo", "bar", "baz"], " - "], "foo - bar - baz")
            .addArgs("arr", "Array<any>")
            .addArgs("separator", "string")
            .setReturnType("string");

        // https://lodash.com/docs/#chunk
        // prettier-ignore
        _.addFunc("chunk")
            .addTest([[1, 2, 3, 4, 5], 2], [[1, 2], [3, 4], [5]])
            .addTest([[1, 2, 3, 4, 5], 3],[[1, 2, 3],[4, 5]])
						.addTest([["a", "b", "c", "d", "e"], 2], [["a", "b"], ["c", "d"], ["e"]])
						.addArgs('arr', 'Array<any>')
						.addArgs('size', 'number')
						.setReturnType('Array<Array<any>>');

        // https://lodash.com/docs/#uniq
        _.addFunc("uniq")
            .addTest([[1, 2, 2, 3, 4, 4, 5]], [1, 2, 3, 4, 5])
            .addTest([["a", "a", "b", "b", "c"]], ["a", "b", "c"])
            .addTest([[true, false, true, true]], [true, false])
            .addArgs("arr", "Array<any>")
            .setReturnType("Array<any>");

        // https://lodash.com/docs/#flatten
        // prettier-ignore
        _.addFunc("flatten")
            .addTest([[[1, 2],[3, 4, 5]]],[1, 2, 3, 4, 5])
            .addTest([[[1, [2, [3, [4, 5]]]]]], [1, 2, 3, 4, 5])
            .addTest([[[[1]], [2, [3, [4, 5]]]]], [1, 2, 3, 4, 5])
            .addArgs("array", "Array<any>")
            .setReturnType("Array<any>");

        // https://lodash.com/docs/#sortBy
        _.addFunc("sortBy")
            .addTest(
                [
                    [
                        { name: "Alice", age: 25 },
                        { name: "Bob", age: 30 },
                        { name: "Charlie", age: 35 },
                    ],
                    "age",
                ],
                [
                    { name: "Alice", age: 25 },
                    { name: "Bob", age: 30 },
                    { name: "Charlie", age: 35 },
                ],
            )
            .addTest(
                [
                    [
                        { name: "Alice", age: 25 },
                        { name: "Bob", age: 30 },
                        { name: "Charlie", age: 35 },
                    ],
                    "name",
                ],
                [
                    { name: "Alice", age: 25 },
                    { name: "Bob", age: 30 },
                    { name: "Charlie", age: 35 },
                ],
            )
            .addTest(
                [
                    [
                        { name: "Charlie", age: 35 },
                        { name: "Alice", age: 25 },
                        { name: "Bob", age: 30 },
                    ],
                    "age",
                ],
                [
                    { name: "Alice", age: 25 },
                    { name: "Bob", age: 30 },
                    { name: "Charlie", age: 35 },
                ],
            )
            .addArgs("array", "Array<any>")
            .addArgs("key", "string")
            .setReturnType("Array<any>");

        // https://lodash.com/docs/#head
        _.addFunc("head")
            .addTest([[1, 2, 3, 4, 5]], 1)
            .addTest([["a", "b", "c", "d", "e"]], "a")
            .addTest([[true, false, true]], true)
            .addArgs("array", "Array<any>")
            .setReturnType("any");

        // https://lodash.com/docs/#filter
        _.addFunc("filter")
            .addTest(
                [
                    [
                        { name: "Alice", age: 25 },
                        { name: "Bob", age: 30 },
                        { name: "Charlie", age: 35 },
                    ],
                    function (o) {
                        return o.age > 30;
                    },
                ],
                [{ name: "Charlie", age: 35 }],
            )
            .addTest(
                [
                    [
                        { name: "Alice", age: 25 },
                        { name: "Bob", age: 30 },
                    ],
                    function (o) {
                        return o.age <= 25;
                    },
                ],
                [{ name: "Alice", age: 25 }],
            )
            .addTest(
                [
                    [
                        { user: "barney", age: 36, active: true },
                        { user: "fred", age: 40, active: false },
                    ],
                    { age: 36, active: true },
                ],
                [{ user: "barney", age: 36, active: true }],
            )
            .addArgs("collection", "Array<any> | Record<string, any>")
            .addArgs("predicate", "Function")
            .setReturnType("Array<any>");

        return _.getObjectAsMap();
    }
    constructor() {
        this._map = this._init();
    }
}

const _ = new LodashTestMap();

export default _;
