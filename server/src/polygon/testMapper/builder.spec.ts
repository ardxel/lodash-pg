import { LodashTestBuilder, LodashTestManager } from "./builder";
import { LodashEntity } from "./types";

describe("Test testMapper module", () => {
    const mockBuilderResult: LodashEntity = {
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
        examples: [`_.join(['a', 'b', 'c'], '~') // => 'a~b~c'`],
        description: "abc",
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
                .addExample(`_.join(['a', 'b', 'c'], '~') // => 'a~b~c'`)
                .setReturnType("string")
                .addDescription("abc");

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
                .setReturnType("string")
                .addExample(`_.join(['a', 'b', 'c'], '~') // => 'a~b~c'`)
                .addDescription("abc");

            expect(builder.toObject()).toEqual(mockBuilderResult);
        });

        test("should throws error because builder doesnt have 3 tests", () => {
            const builder = createBuilder();

            builder
                .addTest([[1, 2, 3, 4, 5], ","], "1,2,3,4,5")
                .addTest([["a", "b", "c"], ""], "abc")
                .addArgs("arr", "Array<any>")
                .addArgs("separator", "string")
                .addExample(`_.join(['a', 'b', 'c'], '~') // => 'a~b~c'`)
                .setReturnType("string")
                .addDescription("abc");

            expect(() => builder.toObject()).toThrow(Error);
        });

        test("shoud throws error because builder doesnt have arguments", () => {
            const builder = createBuilder();

            builder
                .addTest([[1, 2, 3, 4, 5], ","], "1,2,3,4,5")
                .addTest([["a", "b", "c"], ""], "abc")
                .addTest([["foo", "bar", "baz"], " - "], "foo - bar - baz")
                .addExample(`_.join(['a', 'b', 'c'], '~') // => 'a~b~c'`)
                .setReturnType("string")
                .addDescription("abc");

            expect(() => builder.toObject()).toThrow(Error);
        });

        test("shoud throws error because builder doesnt have return type", () => {
            const builder = createBuilder();

            builder
                .addTest([[1, 2, 3, 4, 5], ","], "1,2,3,4,5")
                .addTest([["a", "b", "c"], ""], "abc")
                .addArgs("arr", "Array<any>")
                .addArgs("separator", "string")
                .addExample(`_.join(['a', 'b', 'c'], '~') // => 'a~b~c'`)
                .addDescription("abc");

            expect(() => builder.toObject()).toThrow(Error);
        });
        test("should throws error because builder doesnt have description", () => {
            const builder = createBuilder();

            builder
                .addTest([[1, 2, 3, 4, 5], ","], "1,2,3,4,5")
                .addTest([["a", "b", "c"], ""], "abc")
                .addTest([["foo", "bar", "baz"], " - "], "foo - bar - baz")
                .addArgs("arr", "Array<any>")
                .addArgs("separator", "string")
                .addExample(`_.join(['a', 'b', 'c'], '~') // => 'a~b~c'`)
                .setReturnType("string");

            expect(() => builder.toObject()).toThrow(Error);
        });
        test("should throws error because builder doesnt have examples", () => {
            const builder = createBuilder();

            builder
                .addTest([[1, 2, 3, 4, 5], ","], "1,2,3,4,5")
                .addTest([["a", "b", "c"], ""], "abc")
                .addTest([["foo", "bar", "baz"], " - "], "foo - bar - baz")
                .addArgs("arr", "Array<any>")
                .addArgs("separator", "string")
                .setReturnType("string")
                .addDescription("abc");

            expect(() => builder.toObject()).toThrow(Error);
        });
    });
});
