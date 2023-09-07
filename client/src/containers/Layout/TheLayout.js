import React from "react";
import { TheHeader, TheSidebar, TheContent, TheFooter } from "../index";
import { Layout } from "antd";
import "./TheLayoutCSS.css";

const { Header, Footer, Sider, Content } = Layout;

function TheLayout() {
  return (
    <Layout className="layout-container" theme="light">
      <Sider width={230} theme="light">
        <TheSidebar />
      </Sider>
      <Layout>
        <Header className="layout-header">
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
