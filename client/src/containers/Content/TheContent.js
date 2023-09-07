import React from "react";
import { Outlet } from "react-router-dom";

import "./TheContentCSS.css";

function TheContent() {
  return (
    <div className="div-content-container">
      <Outlet />
    </div>
  );
}

export default TheContent;
