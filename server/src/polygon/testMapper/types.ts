export type TestCase = {
    input: unknown[];
    expected: unknown;
};

export type LodashTestObject = {
    testCases: TestCase[];
    arguments: { name: string; type: string }[];
    returnType: unknown;
};
