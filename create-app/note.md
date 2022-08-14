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

