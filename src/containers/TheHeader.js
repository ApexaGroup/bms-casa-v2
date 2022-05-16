import React from "react";
import UserIcon from "../assets/user.png";
import { Menu, Dropdown, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  SettingOutlined,
  KeyOutlined,
} from "@ant-design/icons";

function TheHeader() {
  function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }
  const menu = (
    <Menu
      onClick={handleMenuClick}
      title="Welcome! CASA Admin"
      items={[
        {
          label: "Welcome! CASA Admin",
          key: "0",
          disabled: true,
        },
        {
          label: "Settings",
          key: "1",
          icon: <SettingOutlined />,
        },
        {
          label: "Change Password",
          key: "2",
          icon: <KeyOutlined />,
        },
        {
          label: "Logout",
          key: "3",
          icon: <LockOutlined />,
        },
      ]}
    />
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Dropdown overlay={menu}>
        <img src={UserIcon} style={{ marginRight: 20, cursor: "pointer" }} />
      </Dropdown>
    </div>
  );
}

export default TheHeader;
