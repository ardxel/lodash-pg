/* eslint-disable @typescript-eslint/no-var-requires */
const { compilerOptions } = require("./tsconfig.json");
const { pathsToModuleNameMapper } = require("ts-jest");
<<<<<<< HEAD

=======
>>>>>>> b1edb10 (Merge pull request #1 from ardxel/dev/server)
/** @type {import('jest').Config} */
module.exports = {
    moduleFileExtensions: ["js", "json", "ts", "node"],
    roots: ["<rootDir>"],
    testRegex: ".*\\.spec\\.ts$",

    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    preset: "ts-jest",
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
};
