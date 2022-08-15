# note
[react-create-app doc](https://create-react-app.dev/docs/getting-started/)  

## 文档和流程
### 开始
#### 创建项目
```cmd
npx create-react-app my-app --template typescript
```

> que: 为什么所有依赖都在 dependencies中，devDependencies是空的

#### 文件夹结构
主要文件
- public/index.html是页面模板；
- src/index.js是 JavaScript 入口点。

#### 脚本命令
- npm start
- [npm test](#test)
- npm run build
- npm run eject 把CRA的内部项目配置和相关文件暴露到项目里

[还在run eject 修改create-react-app中的配置？](https://juejin.cn/post/6844904034780839949)  
- 使用同and-design的方案 react-app-rewired + customize-cra 来定制项目配置
  - 使用config-override.js文件配置
  - 使用override 方法,混合每个参数传入的配置，或者参数传入回调函数在里面修改配置
  - customize-cra 会暴露一些生成功能配置的方法
  - *现在antd 项目使用CRACO配置了 [use-with-create-react-app-cn](https://ant.design/docs/react/use-with-create-react-app-cn)*
- [@craco/craco Create React App Cconfiguration Override CRA修改器](https://www.npmjs.com/package/@craco/craco)
  - 一个顶层的配置文件craco.config.js
  - 自己的插件系统可以使用craco-antd 插件等

#### 浏览器支持
IE 9-11需要polyfill [react-app-polyfill](https://github.com/facebook/create-react-app/blob/main/packages/react-app-polyfill/README.md)

支持ES6等语法的解释但是不包含polyfill

支持配置package.json文件里的browserslist字段（这个不会包含包含 polyfill，那他有什么作用?）

编辑package.json文件可能不会被babel-loader识别到触发刷新，可以尝试删除node\_modules/.cache文件夹重试


#### 更新版本
create-react-app 包含
- create-react-app 用于产生项目命令和应用程序
- react-script 用于生成项目依赖

要更新项目只要更新package.json里面react-script的版本重新npm install就行了

### 开发
#### 编辑器配置

**浏览器联调配置**

**格式化配置**  
使用 husky lint-staged prettier 在提交前执行prettier 格式检查

默认配置在package.json 的eslintConfig 中

建议使用prettier 格式化

#### 独立的组件开发

使用 (Storybook for React)[https://github.com/storybookjs/storybook] 或(React Styleguidist)[https://react-styleguidist.js.org/]
生成组件demo文档

#### 分析bundle 大小
使用[source-map-explorer](https://github.com/danvk/source-map-explorer)查看打包后bundle 大小

#### https 开发

...

### 样式和资源
#### 添加样式
项目中可以在js里import .css文件

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
import React, { Component } from 'react';
import styles from './Button.module.css'; // Import css modules stylesheet as styles
import './another-stylesheet.css'; // Import regular stylesheet

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

#### 添加SASS
npm install sass 就行了

在scss 中引入变量
```scss
@use 'styles/_colors.scss'; // assuming a styles directory under src/
@use '~nprogress/nprogress'; // 引入 node_modules/nprogress 下的文件
```

在项目中添加[.env](https://github.com/facebook/create-react-app/blob/main/docusaurus/docs/adding-custom-environment-variables.md#adding-development-environment-variables-in-env)文件添加默认导入路径

```
SASS_PATH=path1;path2;path3
```

**使用Flow**  
需要覆盖 module.file_ext 配置 包含.sass或.scss和默认的.js.jsx.mjs.json

#### 添加 css reset

在css样式中设置一次 @import-normalize;

会配合browserslist 的设置

#### 后处理
压缩 添加前缀

通过browserslist 配置

CSS Grid Layout前缀默认是禁用的  
可以使用/* autoprefixer grid: autoplace */开启grid的前缀

#### 添加图像、字体和文件

在js和css 中可以引入图像、字体和文件等  
图片文件除svg外可以转为base64  
svg文件可以作为图片文件引入也可以作为react 组件引入

**对于svg**  
```js
// import logo from './logo.svg'; // 引入为文件
import { ReactComponent as Logo } from './logo.svg'; // 引入为组件

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

通过graphql.macro创建加载 .gql和.graphql文件

#### public文件资源

一些资源可以放在public文件夹里,但是更建议在js中使用importy引入
- 脚本样式压缩,合并
- 缺少文件会在打包时报出错误
- 哈希解决缓存问题
在代码中使用 PUBLIC_URL引用
```html
<!-- index.html -->
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

js中使用process.env.PUBLIC_URL

#### 代码拆分
使用import()语法拆分打包代码,返回一个Promise对象


### 构建应用程序
#### 安装依赖
```cmd
npm install --save react-router-dom
```
#### 导入组件

支持但是不建议使用ES5的require() module.exports,推荐使用 import export

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
import Button from 'components/Button';
```





<div id="test"></div>
### 测试
CRA使用Jest测试 使用node 的[jsdom](https://github.com/jsdom/jsdom)提供浏览器环境

识别文件：
- \_\_tests\_\_ 文件夹下jsh后缀的文件
- .test.js 文件
- .spec.js 文件

建议测试文件和功能文件放在一个目录下方便引入 一一对应

**运行**  
npm test 手动运行，保存文件/npm start 时自动运行

**版本和测试范围**  
- 会自动运行和上次提交有差异文件的测试
- 在npm run test 后的交互命令行中可以选择测试选项，使用a选项可以执行全部测试
- 在服务器ci中会全部测试

// todo...




## todo
- [ ] react hook
- [ ] router
- [ ] eslint stylelint
  - 引入后是如何起作用的
- [ ] (commitelint lint-staged husky) cra 是不是已经配置过了???
- [ ] 状态管理各种方案
  1. ...
- [ ] ui库
- [ ] chart 菜单页面 权限
- [ ] 表单和列表页面