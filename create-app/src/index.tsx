import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./index.scoped.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "assets/styles/public.scss";

import {
  BrowserRouter as Router, // 路由器 使用在根部节点
  // Switch, // router5写法
  Routes, //
  Route,
  Link,
  // Redirect, // 使用 <Route element={<Navigate to="/" replace />}>写法代替
  Navigate,
  NavLink,
} from "react-router-dom";
import Error404 from "./pages/err404";
import Page1 from "pages/page1";
import Page2 from "pages/page2";
import Nested from "pages/nested";
import IndexPage from "pages/indexPage";
import UseParams from "pages/useParams";
import X6resize from "pages/x6resize";
import ImmerPage from "pages/immer";
import Statistics from "pages/statistics";
import ReduxView from "pages/reduxView";

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(
  // http://react.caibaojian.com.cn/docs/strict-mode.html
  <React.StrictMode>
    {/* 路径路由模式 */}
    <Router>
      <div className="flex-layout frow">
        <ul className="flex-none menu">
          <li>
            <Link to="/">/</Link>
          </li>
          <li>
            <Link to="/page1">page1</Link>
          </li>
          <li>
            <Link to="/page2">page2</Link>
          </li>
          <li>
            <NavLink to="/page1">page1</NavLink>
          </li>
          <li>
            <NavLink to="/page2">page2</NavLink>
          </li>
          <li>
            <Link to="/nested">nested</Link>
          </li>
          <li>
            <Link to="/indexPage">index page</Link>
          </li>
          <li>
            <Link to="/useParams/233">useParams</Link>
          </li>
          <li>
            <Link to="/x6resize">x6resize</Link>
          </li>
          <li>
            <Link to="/immer">immer</Link>
          </li>
          <li>
            <Link to="/statistics">statistics</Link>
          </li>
          <li>
            <Link to="/redux">redux</Link>
          </li>
        </ul>

        {/* <hr /> */}

        {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
        <div className="flex-auto">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            {/* 不支持插槽写法了? */}
            {/* <Route path="/page2">
              <Page2 />
            </Route> */}
            <Route path="/nested/*" element={<Nested />} />
            <Route path="/indexPage/*" element={<IndexPage />} />
            <Route path="/useParams/:id" element={<UseParams />} />
            <Route path="/x6resize" element={<X6resize />} />
            <Route path="/immer" element={<ImmerPage />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/redux" element={<ReduxView />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
