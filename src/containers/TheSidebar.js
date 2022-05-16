import React from "react";
import { Layout, Menu } from "antd";
import {
  AimOutlined,
  BugOutlined,
  CaretLeftFilled,
  UserOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import casalogo from "../assets/casa-logo.png";
const SubMenu = Menu.SubMenu;

function TheSidebar() {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <img src={casalogo} style={{ width: 100 }} />
      </div>

      <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
        <SubMenu key="1" title={"Menu 1"} icon={<BugOutlined />}>
          <Menu.Item key="20">
            <InfoCircleOutlined />
            <span>Sub Menu Item 1</span>
          </Menu.Item>
          <Menu.Item key="21">
            <InfoCircleOutlined />
            <span>Sub Menu Item 2</span>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="2">
          <InfoCircleOutlined />
          <span>Menu 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <LogoutOutlined />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default TheSidebar;
