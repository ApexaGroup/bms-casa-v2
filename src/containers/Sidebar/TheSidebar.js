import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Modal, Button } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  ApartmentOutlined,
  UserSwitchOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

import Logo from "../../components/Logo/Logo";
import "./TheSidebarCSS.css";

import { TheSidebarStates } from "./TheSidebarLogic";

const SubMenu = Menu.SubMenu;

function TheSidebar() {
  // Destructuring of logic variables/methods
  let { isModalVisible, setIsModalVisible, showModal, handleOk, handleCancel } =
    TheSidebarStates;

  return (
    <div className="div-container-sidebar">
      <Logo myStyle="app-logo-dashboard" />
      <div className="div-container-version">
        <span className="span-version" onClick={showModal}>
          V2.0.0
        </span>
      </div>

      <Menu
        defaultSelectedKeys={["0"]}
        mode="inline"
        className="menu-container"
      >
        <Menu.Item key="1">
          <DashboardOutlined />
          <span>Dashboard</span>
          <Link to="/dashboard" />
        </Menu.Item>
        <SubMenu key="1" title={"User Management"} icon={<ApartmentOutlined />}>
          <Menu.Item key="20">
            <UserOutlined />
            <span>User</span>
            <Link to={"/user"} />
          </Menu.Item>
          <Menu.Item key="21">
            <UserSwitchOutlined />
            <span>Role</span>
            <Link to={"/role"} />
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
      <Modal
        title="Version 2.0.0"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}

export default TheSidebar;
