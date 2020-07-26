module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: [
        "airbnb-base",
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: "module",
    },
    rules: {
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        indent: ["error", 4],
    },
};
