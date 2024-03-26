import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "./index.scoped.css";

import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';
// 或 import 'amis/lib/themes/antd.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  NavLink,
} from 'react-router-dom'

import Amis from './pages/amis/index.js'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="flex-layout frow">
        <ul className="flex-none menu">
          <li>
            <Link to="/">/</Link>
          </li>
          <li>
            <Link to="/amis">amis</Link>
          </li>
        </ul>
        <div className="flex-auto">
          <Routes>
            <Route path="/" element={<App></App>}></Route>
            <Route path="/amis" element={<Amis></Amis>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
 );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
