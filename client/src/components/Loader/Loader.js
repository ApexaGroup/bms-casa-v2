// Default react and react-router imports
import React from "react";

// Antd components imports
import { Spin } from "antd";

// Css design imports
import "./LoaderCSS.css";

function Loader() {
  return (
    <div className="div-loader">
      <Spin />
    </div>
  );
}

export default Loader;
