import { PickOnlyFunctions } from "./util-types";

export type LodashNotFnProps =
    | "VERSION"
    | "bind"
    | "binkKey"
    | "memoize"
    | "partial"
    | "partialRight"
    | "templateSettings";

export type LodashFunctions = Omit<PickOnlyFunctions<import("lodash").LoDashStatic>, LodashNotFnProps>;

export type TestCase = {
    input: unknown[];
    expected: unknown;
};

export type LodashEntity = {
    testCases: TestCase[];
    arguments: { name: string; type: string }[];
    returnType: unknown;
    description: string;
    examples: string[];
};
