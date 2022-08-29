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

- .npmrc npm下载源配置
- <s>EditorConfig 格式化</s>
- Prettier 格式化  
  npm install prettier -D  
  .prettierrc  
- ESLint  
  npm install eslint -D  
  npx eslint --init  
  extends: \['airbnb/hooks', 'plugin:@typescript-eslint/recommended'\]  
  npm install eslint-plugin-promise eslint-plugin-unicorn -D  
  extends: \[..., 'plugin:unicorn/recommended', 'plugin:promise/recommended'\]  
  npm install typescript -D  
  extends: \[..., 'plugin:@typescript-eslint/recommended'\]  
  plugins: ['react', 'unicorn', 'promise', '@typescript-eslint'],  
  .eslintignore
- StyleLint  
  npm install stylelint stylelint-config-standard -D
  .stylelintrc.js
  stylelint-config-rational-order 样式属性排序  
  stylelint-declaration-block-no-ignored-properties 矛盾样式处理  
  npm install stylelint-order stylelint-config-rational-order stylelint-declaration-block-no-ignored-properties -D
  .stylelintrc.js 配置 extends:[...] plugins:[...]  
  命令等
- npm install husky lint-staged -D
  - lint-staged 匹配文件 执行lint命令  
    .lintstagedrc.cjs
  - husky  
    npm install husky --save-dev  
    npx husky install  
    npm pkg set scripts.prepare "husky install" // npm install 时自动初始化 husky  
    npx husky add .husky/pre-commit // 新版本使用add命令添加钩子
- commitlint  
  npm install @commitlint/cli @commitlint/config-conventional -D
  - @commitlint/config-conventional angular 风格的 commitlint 配置 
  npx husky add .husky/commit-msg "commitlint --config .commitlintrc.js -E HUSKY_GIT_PARAMS"
- changelog 生成更改日志md  
  npm install conventional-changelog-cli -D
- **-Webpack-**  
  - npm install webpack webpack-cli -D
  - webpack-merge // webpack 配置合并方法
  - npm install webpack-dev-server html-webpack-plugin -D // 本地服务和 html 打包去注释空格等
  - devtool: 'eval-source-map', // source-map 配置
  - clean-webpack-plugin 打包前清空目录
  - npm install style-loader css-loader -D
  - npm install sass sass-loader -D
  - npm stylelint-config-standard-scss -D  
    .stylelintrc.js   extends: \[ 'stylelint-config-standard-scss'\],
  - npm install file-loader url-loader -D // 在webpack5 中迁移到Asset Modules
- **-React-**
  - npm install react react-dom -S
  - npm install babel-loader @babel/core @babel/preset-react -D  
    .babelrc "presets": \["@babel/preset-react"\] // webpack 使用babel处理babel7语法
  - @babel/preset-typescript // babel ts 支持  
     "presets": \["@babel/preset-typescript"\]
  - npm install @types/react @types/react-dom -D // ts react 支持
  - npm install eslint-import-resolver-typescript -D // eslint import 默认后缀
  - npm install @babel/preset-env @babel/plugin-transform-runtime -D // 浏览器版本支持/ES5新特性支持
  - npm install @babel/runtime-corejs3 -S // 去除babel处理过程中插入的辅助函数
  - npm install copy-webpack-plugin -D // public 静态资源拷贝
  - npm install webpackbar -D // 打包进度
  - npm install fork-ts-checker-webpack-plugin -D // 编译时的ts检查
  - *hard-source-webpack-plugin*
  - externals cdn引入模块
  - npm install mini-css-extract-plugin -D // 独立的css 样式文件
  - npm install purgecss-webpack-plugin glob -D 去除无用样式
  - npm install terser-webpack-plugin -D // js es6 语法压缩
  - npm install optimize-css-assets-webpack-plugin -D // css 压缩
  - webpack.BannerPlugin bundle // 注释消息
  - npm install webpack-bundle-analyzer -D // 包大小分析


