import { LodashTestManager } from "./builder";
import { LodashEntity } from "./types";

export class LodashTestMap {
    private _map: Map<string, LodashEntity>;

    public get(lodashFN: string): LodashEntity {
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
            .setReturnType("string")
            .addExample(`_.join(['a', 'b', 'c'], '~') // => 'a~b~c'`)
						.addDescription('Converts all elements in array into a string separated by separator.');

        // https://lodash.com/docs/#chunk
        // prettier-ignore
        _.addFunc("chunk")
            .addTest([[1, 2, 3, 4, 5], 2], [[1, 2], [3, 4], [5]])
            .addTest([[1, 2, 3, 4, 5], 3],[[1, 2, 3],[4, 5]])
						.addTest([["a", "b", "c", "d", "e"], 2], [["a", "b"], ["c", "d"], ["e"]])
						.addArgs('arr', 'Array<any>')
						.addArgs('size', 'number')
						.setReturnType('Array<Array<any>>')
						.addExample(`_.chunk(['a', 'b', 'c', 'd'], 2); // => [['a', 'b'], ['c', 'd']]`)
						.addExample(`_.chunk(['a', 'b', 'c', 'd'], 3); // => [['a', 'b', 'c'], ['d']]`)
						.addDescription(`Creates an array of elements split into groups the length of size.
						If array can't be split evenly, the final chunk will be the remaining elements.`);

        // https://lodash.com/docs/#uniq
        _.addFunc("uniq")
            .addTest([[1, 2, 2, 3, 4, 4, 5]], [1, 2, 3, 4, 5])
            .addTest([["a", "a", "b", "b", "c"]], ["a", "b", "c"])
            .addTest([[true, false, true, true]], [true, false])
            .addArgs("arr", "Array<any>")
            .setReturnType("Array<any>")
            .addExample(`_.uniq([2, 1, 2]); // => [2, 1]`)
            .addDescription(
                `Creates a duplicate-free version of an array, using SameValueZero for equality comparisons, in which only the first occurrence of each element is kept. The order of result values is determined by the order they occur in the array.`,
            );

        // https://lodash.com/docs/#flatten
        // prettier-ignore
        _.addFunc("flatten")
            .addTest([[[1, 2],[3, 4, 5]]],[1, 2, 3, 4, 5])
            .addTest([[[1, [2, [3, [4, 5]]]]]], [1, 2, 3, 4, 5])
            .addTest([[[[1]], [2, [3, [4, 5]]]]], [1, 2, 3, 4, 5])
            .addArgs("array", "Array<any>")
            .setReturnType("Array<any>")
						.addExample(`_.flatten([1, [2, [3, [4]], 5]]); // => [1, 2, [3, [4]], 5]`)
						.addDescription(`Flattens array a single level deep.`);

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
            .setReturnType("Array<any>")
            .addExample(
                `var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 34 }
];
 
_.sortBy(users, [function(o) { return o.user; }]);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 
_.sortBy(users, ['user', 'age']);
// => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]`,
            )
            .addDescription(
                `Creates an array of elements, sorted in ascending order by the results of running each element in a collection thru each iteratee. This method performs a stable sort, that is, it preserves the original sort order of equal elements. The iteratees are invoked with one argument: (value).`,
            );

        // https://lodash.com/docs/#head
        _.addFunc("head")
            .addTest([[1, 2, 3, 4, 5]], 1)
            .addTest([["a", "b", "c", "d", "e"]], "a")
            .addTest([[true, false, true]], true)
            .addArgs("array", "Array<any>")
            .setReturnType("any")
            .addExample(`_.head([1, 2, 3]); // => 1`)
            .addExample(`_.head([]); // => undefined`)
            .addDescription("Gets the first element of array.");

        // https://lodash.com/docs/#filter
        _.addFunc("filter")
            .addTest(
                [
                    [
                        { name: "Alice", age: 25 },
                        { name: "Bob", age: 30 },
                        { name: "Charlie", age: 35 },
                    ],
                    `function predicate(o) {
                        return o.age > 30;
                    }`,
                ],
                [{ name: "Charlie", age: 35 }],
            )
            .addTest(
                [
                    [
                        { name: "Alice", age: 25 },
                        { name: "Bob", age: 30 },
                    ],
                    `function predicate(o) {
                        return o.age <= 25;
                    }`,
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
            .setReturnType("Array<any>").addExample(`
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];
 
_.filter(users, function(o) { return !o.active; });
// => objects for ['fred']
 
// The \`_.matches\` iteratee shorthand.
_.filter(users, { 'age': 36, 'active': true });
// => objects for ['barney']
 
// The \`_.matchesProperty\` iteratee shorthand.
_.filter(users, ['active', false]);
// => objects for ['fred']
 
// The \`_.property\` iteratee shorthand.
_.filter(users, 'active');
// => objects for ['barney']
			`)
            .addDescription(`Iterates over elements of collection, returning an array of all elements predicate returns truthy for. The predicate is invoked with three arguments: (value, index|key, collection).
		`);

        return _.getObjectAsMap();
    }
    constructor() {
        this._map = this._init();
    }
}

const _ = new LodashTestMap();

export default _;
