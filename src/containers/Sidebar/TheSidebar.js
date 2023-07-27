import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  let location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname === "/"
      ? "/"
      : location.pathname,
  );

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {

        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  return (
    <div className="div-container-sidebar">
      <Logo myStyle="app-logo-dashboard" />
      <div className="div-container-version">
        <span className="span-version" onClick={showModal}>
          V2.0.0
        </span>
      </div>

      <Menu
        selectedKeys={[current]}
        mode="inline"
        className="menu-container"
        id="menu"
      >
        <Menu.Item key="/">
          <DashboardOutlined />
          <span>Dashboard</span>
          <Link to="/" />
        </Menu.Item>
        <SubMenu
          key="10"
          title={"User Management"}
          icon={<ApartmentOutlined />}
          id="userManagement"
        >
          <Menu.Item key="/user" id="user">
            <UserOutlined />
            <span>User</span>
            <Link to={"/user"} />
          </Menu.Item>
          <Menu.Item key="/role">
            <UserSwitchOutlined />
            <span>Role</span>
            <Link to={"/role"} />
          </Menu.Item>
        </SubMenu>
        <SubMenu key="2" title={"Client Master"} icon={<DesktopOutlined />}>
          <Menu.Item key="/client-master/construction-company">
            <SolutionOutlined />
            <span>Construction Company</span>
            <Link to={"/client-master/construction-company"} />
          </Menu.Item>
          <Menu.Item key="/client-master/project-manager">
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
          <Menu.Item key="/extra-charges-section/extra-charges">
            <SolutionOutlined />
            <span>Extra Charges</span>
            <Link to={"/extra-charges-section/extra-charges"} />
          </Menu.Item>
          <Menu.Item key="/extra-charges-section/over-time-fees">
            <ProjectOutlined />
            <span>Over Time Fees</span>
            <Link to={"/extra-charges-section/over-time-fees"} />
          </Menu.Item>
          <Menu.Item key="/extra-charges-section/short-load-charges">
            <ProjectOutlined />
            <span>Short Load Charges</span>
            <Link to={"/extra-charges-section/short-load-charges"} />
          </Menu.Item>
          <Menu.Item key="/extra-charges-section/premium-rates">
            <ProjectOutlined />
            <span>Premium Rates</span>
            <Link to={"/extra-charges-section/premium-rates"} />
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="6"
          title={"Terms & Conditions"}
          icon={<DesktopOutlined />}
        >
          <Menu.Item key="/terms-conditions/short-details">
            <SolutionOutlined />
            <span>Short Details</span>
            <Link to={"/terms-conditions/short-details"} />
          </Menu.Item>
          <Menu.Item key="/terms-conditions/full-details">
            <ProjectOutlined />
            <span>Full Details</span>
            <Link to={"/terms-conditions/full-details"} />
          </Menu.Item>

        </SubMenu>

        <SubMenu key="4" title={"Company Master"} icon={<DesktopOutlined />}>
          <Menu.Item key="/company-master/house-mix-design">
            <SolutionOutlined />
            <span>House Mix Design</span>
            <Link to={"/company-master/house-mix-design"} />
          </Menu.Item>
          <Menu.Item key="/company-master/special-mix-design">
            <ProjectOutlined />
            <span>Special Mix Design</span>
            <Link to={"/company-master/special-mix-design"} />
          </Menu.Item>
        </SubMenu>

        <SubMenu key="5" title={"Lead Section"} icon={<DesktopOutlined />}>
          <Menu.Item key="/lead-section/address">
            <SolutionOutlined />
            <span>Address</span>
            <Link to={"/lead-section/address"} />
          </Menu.Item>
          <Menu.Item key="/lead-section/lead">
            <ProjectOutlined />
            <span>Lead</span>
            <Link to={"/lead-section/lead"} />
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="/opportunity">
          <DashboardOutlined />
          <span>Opportunity</span>
          <Link to="/opportunity" />
        </Menu.Item>

        <Menu.Item key="/quotation">
          <DashboardOutlined />
          <span>Quotation</span>
          <Link to="/quotation" />
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
