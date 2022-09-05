/* eslint-disable unicorn/prefer-module,import/no-import-module-exports */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './assets/font/iconfont/iconfont.css';
import './assets/styles/public.scss';

if (module && module.hot) { // dev 局部更新 配合 webpack.HotModuleReplacementPlugin
  module.hot.accept();
}

const container = document.querySelector('#root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App name="tony" age={20} />);
