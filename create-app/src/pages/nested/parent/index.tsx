import React from "react";
import "./index.scoped.scss";
import { Outlet } from "react-router-dom";
export default function parentPage() {
  return (
    <div>
      <h2>parent</h2>
      <div className="child-wp">
        <Outlet />
      </div>
    </div>
  );
}
