import { LodashFunctions } from "./types";

type KeysLodashFunctions = keyof LodashFunctions;

type TestCase = {
    input: unknown[];
    expected: unknown;
};

const testCases = {
    join: [
        {
            input: [[1, 2, 3, 4, 5], ","],
            expected: "1,2,3,4,5",
        },
        {
            input: [["a", "b", "c"], ""],
            expected: "abc",
        },
        {
            input: [["foo", "bar", "baz"], " - "],
            expected: "foo - bar - baz",
        },
    ],
    chunk: [
        {
            input: [[1, 2, 3, 4, 5], 2],
            expected: [[1, 2], [3, 4], [5]],
        },
        {
            input: [[1, 2, 3, 4, 5], 3],
            expected: [
                [1, 2, 3],
                [4, 5],
            ],
        },
        {
            input: [["a", "b", "c", "d", "e"], 2],
            expected: [["a", "b"], ["c", "d"], ["e"]],
        },
    ],
    uniq: [
        {
            input: [[1, 2, 2, 3, 4, 4, 5]],
            expected: [1, 2, 3, 4, 5],
        },
        {
            input: [["a", "a", "b", "b", "c"]],
            expected: ["a", "b", "c"],
        },
        {
            input: [[true, false, true, true]],
            expected: [true, false],
        },
    ],
};

export type ImplementedLodashFn = keyof typeof testCases;

export default testCases;
