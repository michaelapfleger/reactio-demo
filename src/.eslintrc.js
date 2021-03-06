module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'airbnb-base',
        'plugin:react/recommended',
    ],
    plugins: [
        'react'
    ],
    globals: {
      test: true,
      expect: true,
    },
    env: {
        browser: true,
    },
    rules: {
        'linebreak-style': 0,
    }
};