const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['warn'],
        },
    },
];