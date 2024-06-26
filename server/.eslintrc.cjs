/* eslint-disable linebreak-style */
module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "unused-imports/no-unused-imports": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "linebreak-style": ["error", "unix"],
        quotes: ["off", "single"],
        semi: ["warn", "always"],
        indent: "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/no-var-requires": "off",
    },
};
