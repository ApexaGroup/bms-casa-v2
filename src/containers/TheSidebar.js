import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Modal, Button } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  ApartmentOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

import Logo from "../components/Logo/Logo";
const SubMenu = Menu.SubMenu;

function TheSidebar() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ backgroundColor: "#ff5500" }}>
      <Logo myStyle="app-logo-dashboard" />
      <div style={{ textAlign: "center", cursor: "pointer" }}>
        <span style={{ color: "white" }} onClick={showModal}>
          V2.0.0
        </span>
      </div>

      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        style={{ backgroundColor: "#ff5500" }}
      >
        <SubMenu key="1" title={"User Management"} icon={<ApartmentOutlined />}>
          <Menu.Item key="20">
            <UserOutlined />
            <span>User</span>
            <Link to={"/dashboard/user-management/user"} />
          </Menu.Item>
          <Menu.Item key="21">
            <UserSwitchOutlined />
            <span>Role</span>
            <Link to={"/dashboard/user-management/role"} />
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
