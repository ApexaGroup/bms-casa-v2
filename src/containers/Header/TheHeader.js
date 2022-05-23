import React from "react";
import UserIcon from "../../assets/user.png";
import { Menu, Dropdown, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  SettingOutlined,
  KeyOutlined,
} from "@ant-design/icons";

import "./TheHeaderCSS.css";

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
    <div className="div-header-container">
      <Dropdown overlay={menu}>
        <img src={UserIcon} className="img-profile" />
      </Dropdown>
    </div>
  );
}

export default TheHeader;
