# note

[react-create-app doc](https://create-react-app.dev/docs/getting-started/)

## 文档和流程

### 开始

#### 创建项目

```cmd
npx create-react-app my-app --template typescript
```

> que: 为什么所有依赖都在 dependencies 中，devDependencies 是空的

#### 文件夹结构

主要文件

- public/index.html 是页面模板；
- src/index.js 是 JavaScript 入口点。

#### 脚本命令

- npm start
- [npm test](#test)
- npm run build
- npm run eject 把 CRA 的内部项目配置和相关文件暴露到项目里

[还在 run eject 修改 create-react-app 中的配置？](https://juejin.cn/post/6844904034780839949)

- 使用同 and-design 的方案 react-app-rewired + customize-cra 来定制项目配置
  - 使用 config-override.js 文件配置
  - 使用 override 方法,混合每个参数传入的配置，或者参数传入回调函数在里面修改配置
  - customize-cra 会暴露一些生成功能配置的方法
  - _现在 antd 项目使用 CRACO 配置了 [use-with-create-react-app-cn](https://ant.design/docs/react/use-with-create-react-app-cn)_
- [@craco/craco Create React App Cconfiguration Override CRA 修改器](https://www.npmjs.com/package/@craco/craco)
  - 一个顶层的配置文件 craco.config.js
  - 自己的插件系统可以使用 craco-antd 插件等

#### 浏览器支持

IE 9-11 需要 polyfill [react-app-polyfill](https://github.com/facebook/create-react-app/blob/main/packages/react-app-polyfill/README.md)

支持 ES6 等语法的解释但是不包含 polyfill

支持配置 package.json 文件里的 browserslist 字段（这个不会包含包含 polyfill，那他有什么作用?）

编辑 package.json 文件可能不会被 babel-loader 识别到触发刷新，可以尝试删除 node_modules/.cache 文件夹重试

#### 更新版本

create-react-app 包含

- create-react-app 用于产生项目命令和应用程序
- react-script 用于生成项目依赖

要更新项目只要更新 package.json 里面 react-script 的版本重新 npm install 就行了

### 开发

#### 编辑器配置

**浏览器联调配置**

**格式化配置**  
使用 husky lint-staged prettier 在提交前执行 prettier 格式检查

默认配置在 package.json 的 eslintConfig 中

建议使用 prettier 格式化

#### 独立的组件开发

使用 (Storybook for React)[https://github.com/storybookjs/storybook] 或(React Styleguidist)[https://react-styleguidist.js.org/]
生成组件 demo 文档

#### 分析 bundle 大小

使用[source-map-explorer](https://github.com/danvk/source-map-explorer)查看打包后 bundle 大小

#### https 开发

...

### 样式和资源

#### 添加样式

项目中可以在 js 里 import .css 文件

#### cssmodule

使用 [name].module.css 命名样式文件引入后会为每个类生成唯一类名

button.module.css

```css
.error {
  background-color: red;
}
```

Button.js

```js
import React, { Component } from "react";
import styles from "./Button.module.css"; // Import css modules stylesheet as styles
import "./another-stylesheet.css"; // Import regular stylesheet

class Button extends Component {
  render() {
    // reference as a js object
    return <button className={styles.error}>Error Button</button>;
  }
}
```

优点 可以支持.module.css 文件重用  
缺点 引入后需要通过一个对象引用  
问题 复杂的样式怎么引用 使用 composes: className; 命名

[css-modules](https://github.com/css-modules/css-modules)

其他定义

```css
/* 使用类目做属性 */
.className {
  color: green;
  background: red;
}
/* 使用composes定义 */
.otherClassName {
  composes: className;
  color: yellow;
}
/* 定义到指定模块 */
.otherClassName {
  composes: className from "./style.css";
}
/* 定义到全局 */
.otherClassName {
  composes: globalClassName from global;
}
:global {
  .global-class-name {
    color: green;
  }
}
```

- 一个类似 vue css scoped 的解决方案[ow to add scoped css in react?](https://stackoverflow.com/questions/50849070/how-to-add-scoped-css-in-react)  
  [react-scoped-css](https://github.com/gaoxiaoliangz/react-scoped-css)  
  引入 \*.scoped.css 的文件会给文件内的类名和引入的组件上增加 hash
- 对象/数组转类名库 [classnames](https://github.com/JedWatson/classnames)

#### 添加 SASS

npm install sass 就行了

在 scss 中引入变量

```scss
@use "styles/_colors.scss"; // assuming a styles directory under src/
@use "~nprogress/nprogress"; // 引入 node_modules/nprogress 下的文件
```

在项目中添加[.env](https://github.com/facebook/create-react-app/blob/main/docusaurus/docs/adding-custom-environment-variables.md#adding-development-environment-variables-in-env)文件添加默认导入路径

```
SASS_PATH=path1;path2;path3
```

**使用 Flow**  
需要覆盖 module.file_ext 配置 包含.sass 或.scss 和默认的.js.jsx.mjs.json

#### 添加 css reset

在 css 样式中设置一次 @import-normalize;

会配合 browserslist 的设置

#### 后处理

压缩 添加前缀

通过 browserslist 配置

CSS Grid Layout 前缀默认是禁用的  
可以使用/_ autoprefixer grid: autoplace _/开启 grid 的前缀

#### 添加图像、字体和文件

在 js 和 css 中可以引入图像、字体和文件等  
图片文件除 svg 外可以转为 base64  
svg 文件可以作为图片文件引入也可以作为 react 组件引入

**对于 svg**

```js
// import logo from './logo.svg'; // 引入为文件
import { ReactComponent as Logo } from "./logo.svg"; // 引入为组件

function App() {
  return (
    <div>
      {/* Logo is an actual React component */}
      <Logo />
    </div>
  );
}
```

```css
.Logo {
  background-image: url(./logo.png);
}
```

#### .graphql 文件

通过 graphql.macro 创建加载 .gql 和.graphql 文件

#### public 文件资源

一些资源可以放在 public 文件夹里,但是更建议在 js 中使用 importy 引入

- 脚本样式压缩,合并
- 缺少文件会在打包时报出错误
- 哈希解决缓存问题
  在代码中使用 PUBLIC_URL 引用

```html
<!-- index.html -->
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

js 中使用 process.env.PUBLIC_URL

#### 代码拆分

使用 import()语法拆分打包代码,返回一个 Promise 对象

### 构建应用程序

#### 安装依赖

```cmd
npm install --save react-router-dom
```

#### 导入组件

支持但是不建议使用 ES5 的 require() module.exports,推荐使用 import export

引入组件文件 ...

绝对路径定义
jsconfig.json/tsconfig.json

```js
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

```js
import Button from "components/Button";
```

#### 全局变量

通过 windows 引用 或者 //eslint-disable-line

#### 添加 Bootstrap

[React Bootstrap](https://react-bootstrap.netlify.app/)  
[reactstrap 牺牲某些功能为代价寻求较小构建的项目](https://reactstrap.github.io/?path=/story/home-installation--page)

npm install bootstrap

替换默认样式定义

```scss
// Override default variables before the import
$body-bg: #000; // 覆盖默认样式定义

// Import Bootstrap and its default variables
@import "~bootstrap/scss/bootstrap.scss";
```

#### 使用 Flow

类型检查工具

#### 使用 typescript

初始化一个 ts 项目

```cmd
npx create-react-app my-app --template typescript
```

或者添加 TS 到已有项目

```cmd
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

[react ts 备忘录](https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets) // todo

不支持常量枚举和命名空间

https://stackoverflow.com/questions/40227401/[const-enum-in-typescript](https://stackoverflow.com/questions/40227401/const-enum-in-typescript)声明枚举前不能加const  
常量枚举 const enum 每 TS 编译后是一个映射数组，一般枚举编译后是个对象，可以使用枚举值到枚举名的映射

#### 使用 relay

[relay](https://relay.dev/)支持 GraphQL 的数据驱动 react 应用程序

#### 使用 router

<s>[react-router-dom](https://v5.reactrouter.com/web/guides/quick-start)</s>
[react-router-dom v6](https://reactrouter.com/docs/en/v6)

[./react-router-dom.md](./react-router-dom.md)

<div id="test"></div>
### 测试
CRA使用Jest测试 使用node 的[jsdom](https://github.com/jsdom/jsdom)提供浏览器环境

识别文件：

- \_\_tests\_\_ 文件夹下 jsh 后缀的文件
- .test.js 文件
- .spec.js 文件

建议测试文件和功能文件放在一个目录下方便引入 一一对应

**运行**  
npm test 手动运行，保存文件/npm start 时自动运行

**版本和测试范围**

- 会自动运行和上次提交有差异文件的测试
- 在 npm run test 后的交互命令行中可以选择测试选项，使用 a 选项可以执行全部测试
- 在服务器 ci 中会全部测试

// todo...

styleinject 注入 js class 样式

- [React 拾遗：从 10 种现在流行的 CSS 解决方案谈谈我的最爱 （上） 2018](https://juejin.cn/post/6844903633109139464)
- [React 拾遗：从 10 种现在流行的 CSS 解决方案谈谈我的最爱 （中） 2018](https://juejin.cn/post/6844903633662771207)
- [React 拾遗：从 10 种现在流行的 CSS 解决方案谈谈我的最爱 （下） 2018](https://juejin.cn/post/6844903638289252360)

- babel-plugin-react-css-modules 使用 styleName 替代了 className={style.className} 可以是动态，静态和动态的会分开渲染
- [styled-jsx](https://github.com/vercel/styled-jsx) 单文件嵌入 css 有 scoped 效果 可以处理 scss 吗
  - [styled-jsx-plugin-sass](https://github.com/giuseppeg/styled-jsx-plugin-sass)
  - [craco-styled-jsx 目前还不支持 react18](https://github.com/cr4zyc4t/craco-styled-jsx)
- [tailwindcss](https://tailwindcss.com/) 样式缩写库
