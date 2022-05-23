// Default react and react-router imports
import React from "react";

// Antd components imports
import { Input, Button, Table } from "antd";

// Css design imports
import "./UserPageCSS.css";

import { UserPageStates } from "./UserPageLogic";

const { Search } = Input;

function UserPageDesign() {
  const { dataSource, columns } = UserPageStates();

  return (
    <div>
      <div className="div-page-header">
        <Search placeholder="Search" className="div-search" />
        <Button className="button-add-user">Add User</Button>
      </div>

      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
}

export default UserPageDesign;
