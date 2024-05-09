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
