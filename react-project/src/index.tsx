import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './assets/font/iconfont/iconfont.css';

const container = document.querySelector('#root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App name="tony" age={20} />);
