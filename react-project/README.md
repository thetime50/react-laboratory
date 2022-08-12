# react-project

[\[2.7w字\]我是这样搭建 React+Typescript项目环境的(上)](https://juejin.cn/post/6860129883398668296)  
[\[2.7w字\]我是这样搭建 React+Typescript项目环境的(下)](https://juejin.cn/post/6860134655568871437)


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

