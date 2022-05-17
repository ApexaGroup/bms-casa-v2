import React from "react";
import { TheHeader, TheSidebar } from "./index";
import { Layout, Menu } from "antd";
import {
  AimOutlined,
  BugOutlined,
  CaretLeftFilled,
  UserOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import TheContent from "./TheContent";
import TheFooter from "./TheFooter";

const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

function TheLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }} theme="light">
      <Sider
        width={200}
        theme="light"
        style={{ backgroundColor: "#ff5500", opacity: "0.8" }}
      >
        <TheSidebar />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fafafa",
            padding: 0,
            paddingLeft: 16,
            width: "100%",
          }}
        >
          <TheHeader />
        </Header>
        <Content>
          <TheContent />
        </Content>
        <Footer>
          <TheFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default TheLayout;
