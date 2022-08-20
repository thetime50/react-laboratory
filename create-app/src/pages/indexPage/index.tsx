import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./index.scoped.scss";
import Parent from "./parent";
import IndexPage from "./indexPage";
import Child1 from "./child1";
import Child2 from "./child2";
export default function indexPage() {
  // 嵌套路由
  return (
    <div>
      <h1>index</h1>
      <p>
        {/* 替代掉末级路径 */}
        <Link to=".">.</Link>
        <Link to="child1">child1</Link>
        <Link to="child2">child2</Link>
      </p>
      <Routes>
        {/* <Route path="/" element={<Navigate to="parent" replace />} /> */}
        {/* 有子路由最好加*通配 虽然在同一个组件内嵌套路由时可以不加* */}
        {/* (如果父组件匹配根路由 在子组件匹配子路由时 父组件一定要加*) */}
        <Route path="/*" element={<Parent />}>
          <Route index element={<IndexPage />} />
          <Route path="child1" element={<Child1 />} />
          <Route path="child2" element={<Child2 />} />
        </Route>
      </Routes>
    </div>
  );
}
