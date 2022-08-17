module.exports = {
  extends: [
    "react-app",
    // "shared-config",
    
    "plugin:unicorn/recommended",
    "plugin:promise/recommended",
   	'prettier',
    // 'prettier/@typescript-eslint',// 已经合并到prettier里了
    // 'prettier/react',
    // 'prettier/unicorn',
  ],
  rules: {
    "unicorn/filename-case":0,
    'unicorn/prevent-abbreviations': [ // 命名缩写配置
      'error',
      {
        allowList: {
          props: true,
          args: true,
          temp: true,
          // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/567
          'react-app-env.d': true,
        },
      },
    ],
  },
  overrides: [
    // {
    //   files: ["**/*.ts?(x)","**/*.js?(x)","**/*.json",],
    //   rules: {
    //     "additional-typescript-only-rule": "warn",
    //   },
    // },
  ],
};
