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
          {/* <Menu.Item key="/role" id="role">
            <UserSwitchOutlined />
            <span>Role</span>
            <Link to={"/role"} />
          </Menu.Item> */}
        </SubMenu>
        <SubMenu key="2" title={"Client Master"} icon={<DesktopOutlined />} id="clientMaster">
          <Menu.Item key="/client-master/construction-company" id="constructionCompany">
            <SolutionOutlined />
            <span>Construction Company</span>
            <Link to={"/client-master/construction-company"} />
          </Menu.Item>
          <Menu.Item key="/client-master/project-manager" id="projectManager">
            <ProjectOutlined />
            <span>Project Manager</span>
            <Link to={"/client-master/project-manager"} />
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="3"
          title={"Extra Charges Section"}
          icon={<DesktopOutlined />}
          id="extraCharges"
        >
          <Menu.Item key="/extra-charges-section/extra-charges" id="ec">
            <SolutionOutlined />
            <span>Extra Charges</span>
            <Link to={"/extra-charges-section/extra-charges"} />
          </Menu.Item>
          <Menu.Item key="/extra-charges-section/over-time-fees" id="otf">
            <ProjectOutlined />
            <span>Over Time Fees</span>
            <Link to={"/extra-charges-section/over-time-fees"} />
          </Menu.Item>
          <Menu.Item key="/extra-charges-section/short-load-charges" id="slc">
            <ProjectOutlined />
            <span>Short Load Charges</span>
            <Link to={"/extra-charges-section/short-load-charges"} />
          </Menu.Item>
          <Menu.Item key="/extra-charges-section/premium-rates" id="pr">
            <ProjectOutlined />
            <span>Premium Rates</span>
            <Link to={"/extra-charges-section/premium-rates"} />
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="6"
          title={"Terms & Conditions"}
          icon={<DesktopOutlined />}
          id="termscoditions"
        >
          <Menu.Item key="/terms-conditions/short-details" id="sd">
            <SolutionOutlined />
            <span>Short Details</span>
            <Link to={"/terms-conditions/short-details"} />
          </Menu.Item>
          <Menu.Item key="/terms-conditions/full-details" id="fd">
            <ProjectOutlined />
            <span>Full Details</span>
            <Link to={"/terms-conditions/full-details"} />
          </Menu.Item>

        </SubMenu>

        <SubMenu key="4" title={"Company Master"} icon={<DesktopOutlined />} id="companyMaster">
          <Menu.Item key="/company-master/house-mix-design" id="hmd">
            <SolutionOutlined />
            <span>House Mix Design</span>
            <Link to={"/company-master/house-mix-design"} />
          </Menu.Item>
          <Menu.Item key="/company-master/special-mix-design" id="smd">
            <ProjectOutlined />
            <span>Special Mix Design</span>
            <Link to={"/company-master/special-mix-design"} />
          </Menu.Item>
        </SubMenu>

        <SubMenu key="5" title={"Lead Section"} icon={<DesktopOutlined />} id="leadSection">
          <Menu.Item key="/lead-section/address" id="address">
            <SolutionOutlined />
            <span>Address</span>
            <Link to={"/lead-section/address"} />
          </Menu.Item>
          <Menu.Item key="/lead-section/lead" id="lead">
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
