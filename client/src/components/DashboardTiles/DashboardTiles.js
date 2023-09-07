import React from "react";

// Css design imports
import "./DashboardTilesCSS.css";

function DashboardItem(props) {
  return (
    <div className="div-item">
      <span className="span-value">{props.value}</span>
      <span className="span-title">{props.title}</span>
    </div>
  );
}

export default DashboardItem;
