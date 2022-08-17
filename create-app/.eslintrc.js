module.exports = {
  extends: [
    "react-app",
    // "shared-config",
    
    "plugin:unicorn/recommended",
    "plugin:promise/recommended",
   	'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/unicorn',
  ],
  rules: {
    "additional-rule": "warn",
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
  overrides: [
    {
      files: ["**/*.ts?(x)","**/*.js?(x)","**/*.json",],
      rules: {
        "additional-typescript-only-rule": "warn",
      },
    },
  ],
};
