import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Modal, Button } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  ProjectOutlined,
  ApartmentOutlined,
  UserSwitchOutlined,
  DashboardOutlined,
  DesktopOutlined,
  SolutionOutlined,
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
        <SubMenu
          key="10"
          title={"User Management"}
          icon={<ApartmentOutlined />}
        >
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
        <SubMenu key="2" title={"Client Master"} icon={<DesktopOutlined />}>
          <Menu.Item key="20">
            <SolutionOutlined />
            <span>Construction Company</span>
            <Link to={"/client-master/construction-company"} />
          </Menu.Item>
          <Menu.Item key="21">
            <ProjectOutlined />
            <span>Project Manager</span>
            <Link to={"/client-master/project-manager"} />
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="3"
          title={"Extra Charges Section"}
          icon={<DesktopOutlined />}
        >
          <Menu.Item key="22">
            <SolutionOutlined />
            <span>Extra Charges</span>
            <Link to={"/extra-charges-section/extra-charges"} />
          </Menu.Item>
          <Menu.Item key="23">
            <ProjectOutlined />
            <span>Over Time Fees</span>
            <Link to={"/extra-charges-section/over-time-fees"} />
          </Menu.Item>
          <Menu.Item key="24">
            <ProjectOutlined />
            <span>Short Load Charges</span>
            <Link to={"/extra-charges-section/short-load-charges"} />
          </Menu.Item>
          <Menu.Item key="25">
            <ProjectOutlined />
            <span>Premium Rates</span>
            <Link to={"/extra-charges-section/premium-rates"} />
          </Menu.Item>
        </SubMenu>
        <SubMenu key="4" title={"Company Master"} icon={<DesktopOutlined />}>
          <Menu.Item key="26">
            <SolutionOutlined />
            <span>House Mix Design</span>
            <Link to={"/company-master/house-mix-design"} />
          </Menu.Item>
          <Menu.Item key="27">
            <ProjectOutlined />
            <span>Special Mix Design</span>
            <Link to={"/company-master/special-mix-design"} />
          </Menu.Item>
        </SubMenu>
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
