/* eslint-disable unicorn/prefer-module, @typescript-eslint/no-var-requires */
const path = require('node:path');

const OFF = 0; // eslint-disable-line no-unused-vars
const WARN = 1; // eslint-disable-line no-unused-vars
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    // 'eslint:recommended',
    'plugin:react/recommended',
    'plugin:unicorn/recommended', // 命名规范
    'plugin:promise/recommended', // promise 最佳实践
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest', // 11,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      },
      typescript: {},
    },
  },
  plugins: [
    'react', 'unicorn', 'promise',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        json: 'never',
        js: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
    'react/jsx-filename-extension': [ // react jsx 文件名后缀
      2,
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    ],
    'unicorn/prevent-abbreviations': [ // 命名缩写配置
      'error',
      {
        allowList: {
          props: true,
          args: true,
          temp: true,
        },
      },
    ],
  },
};
