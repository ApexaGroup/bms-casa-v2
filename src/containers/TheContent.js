import React from "react";
import { Outlet } from "react-router-dom";

import "./index.css";

function TheContent() {
  return (
    <div className="div-content-container">
      <Outlet />
    </div>
  );
}

export default TheContent;
