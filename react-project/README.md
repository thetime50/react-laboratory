# react-project

[\[2.7w字\]我是这样搭建 React+Typescript项目环境的(上)](https://juejin.cn/post/6860129883398668296)  
[\[2.7w字\]我是这样搭建 React+Typescript项目环境的(下)](https://juejin.cn/post/6860134655568871437)  
[github 项目](https://github.com/vortesnail/react-ts-quick-starter)

[husky](https://typicode.github.io/husky/#/)
[为什么哈士奇放弃了传统的 JS 配置](https://blog.typicode.com/husky-git-hooks-javascript-config/)

将husky 升级到 8.0.1 使用 .git 与package.json不同级目录的配置
lint-staged 使用.cjs文件配置

 "commit-msg": "commitlint --config .commitlintrc.js -E HUSKY_GIT_PARAMS" -E??



```
Do not use "require".eslintunicorn/prefer-module
Require statement not part of import statement.eslint@typescript-eslint/no-var-requires
```
(Prefer JavaScript modules (ESM) over CommonJS)[https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md]  
(Disable unicorn/prefer-module in certain files)[https://github.com/xojs/xo/issues/540]  
(Meta: Make npm run test run on Windows)[https://github.com/refined-github/refined-github/pull/4729]


<!-- https://www.jianshu.com/p/e687aa625f71 -->

- 替换dart-css
- 资源加载使用 asset

- 允许eslint unicorn props缩写

- Src 等项目路径匹配
    - tsconfig.json 文件配置要
    - .eslintrc.js eslint-import-resolver-typescript 插件匹配 (只要一行typescript)
    - webpack.common.js 文件匹配


## 功能点整理

- .npmrc 文件配置项目npm源
- <s>EditorConfig 编码风格</s>
- Prettier  
    npm install prettier -D  
    .prettierrc  
- eslint  
    npm install eslint -D  
    npx eslint --init  
    extends: \['airbnb/hooks','plugin:@typescript-eslint/recommended'\]  
    npm install eslint-plugin-promise eslint-plugin-unicorn -D  
    extends: \[ ..., 'plugin:unicorn/recommended', 'plugin:promise/recommended',\]  
    npm install typescript -D  
    extends: \[ ..., 'plugin:unicorn/recommended', 'plugin:promise/recommended',\]  
    plugins: ['react', 'unicorn', 'promise', '@typescript-eslint'],  
- StyleLint



