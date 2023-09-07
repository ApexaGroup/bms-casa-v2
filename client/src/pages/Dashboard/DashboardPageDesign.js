// Default react and react-router imports
import React from "react";

// Antd components import
import { TinyColumn, TinyLine, TinyArea } from "@ant-design/plots";

// Css design imports
import "./DashboardPageCSS.css";

/**
 * Custom component imports
 * @DashboardItem This component is for showing dashboard item
 */

import DashboardTiles from "../../components/DashboardTiles/DashboardTiles";

function DashboardPageDesign() {
  // Dummy Data
  const data = [274, 337, 81, 497, 666, 219, 269];
  const config = {
    height: 80,
    width: 200,
    autoFit: true,
    smooth: true,
    data,
  };

  return (
    <div>
      <div className="div-container">
        <div className="div-approval-pending">
          <DashboardTiles value="14" title="Approval Pending" />
          <div className="div-graph">
            <TinyColumn {...config} />
          </div>
        </div>
        <div className="div-total-opportunity">
          <DashboardTiles value="04" title="Total Opportunity" />
          <div className="div-graph">
            <TinyLine {...config} />
          </div>
        </div>
        <div className="div-total-users">
          <DashboardTiles value="34" title="Total Users" />

          <div className="div-graph-user">
            <TinyArea {...config} />
          </div>
        </div>
        <div className="div-total-clients">
          <DashboardTiles value="46" title="Total Clients" />

          <div className="div-graph-user">
            <TinyColumn {...config} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPageDesign;
