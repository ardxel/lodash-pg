import { LodashTestBuilder, LodashTestManager } from "./builder";
import { LodashTestObject } from "./types";

describe("Test testMapper module", () => {
    const mockBuilderResult: LodashTestObject = {
        testCases: [
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
        returnType: "string",
        arguments: [
            { name: "arr", type: "Array<any>" },
            {
                name: "separator",
                type: "string",
            },
        ],
    };

    const createBuilder = () => new LodashTestBuilder("join");
    const createManager = () => new LodashTestManager();

    describe("Test LodashTestManager", () => {
        test("join property should equal to the same object", () => {
            const manager = createManager();

            manager
                .addFunc("join")
                .addTest([[1, 2, 3, 4, 5], ","], "1,2,3,4,5")
                .addTest([["a", "b", "c"], ""], "abc")
                .addTest([["foo", "bar", "baz"], " - "], "foo - bar - baz")
                .addArgs("arr", "Array<any>")
                .addArgs("separator", "string")
                .setReturnType("string");

            expect(manager.getObjectAsMap().get("join")).toEqual(mockBuilderResult);
        });
    });

    describe('Test "LodashTestBuilder" ', () => {
        test("should equal to object with the same properties", () => {
            const builder = createBuilder();

            builder
                .addTest([[1, 2, 3, 4, 5], ","], "1,2,3,4,5")
                .addTest([["a", "b", "c"], ""], "abc")
                .addTest([["foo", "bar", "baz"], " - "], "foo - bar - baz")
                .addArgs("arr", "Array<any>")
                .addArgs("separator", "string")
                .setReturnType("string");

            expect(builder.toObject()).toEqual(mockBuilderResult);
        });

        test("should throws error because builder doesnt have 3 tests", () => {
            const builder = createBuilder();

            builder
                .addTest([[1, 2, 3, 4, 5], ","], "1,2,3,4,5")
                .addTest([["a", "b", "c"], ""], "abc")
                .addArgs("arr", "Array<any>")
                .addArgs("separator", "string")
                .setReturnType("string");

            expect(() => builder.toObject()).toThrow(Error);
        });

        test("shoud throws error because builder doesnt have arguments", () => {
            const builder = createBuilder();

            builder
                .addTest([[1, 2, 3, 4, 5], ","], "1,2,3,4,5")
                .addTest([["a", "b", "c"], ""], "abc")
                .addTest([["foo", "bar", "baz"], " - "], "foo - bar - baz")
                .setReturnType("string");

            expect(() => builder.toObject()).toThrow(Error);
        });

        test("shoud throws error because builder doesnt have return type", () => {
            const builder = createBuilder();

            builder
                .addTest([[1, 2, 3, 4, 5], ","], "1,2,3,4,5")
                .addTest([["a", "b", "c"], ""], "abc")
                .addArgs("arr", "Array<any>")
                .addArgs("separator", "string");

            expect(() => builder.toObject()).toThrow(Error);
        });
    });
});
