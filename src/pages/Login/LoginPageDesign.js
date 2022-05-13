import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button } from "antd";
import "./LoginPageCSS.css";
import casalogo from "../../assets/casa-logo.png";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
} from "@ant-design/icons";

function LoginPageDesign() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <Card className="card-style">
        <div style={{ textAlign: "center" }}>
          <img
            src={casalogo}
            style={{ width: 170, height: "auto", textAlign: "center" }}
          />
        </div>

        <span style={{ fontSize: 28, fontWeight: "bold" }}>Login | </span>
        <span style={{ fontSize: 22, fontWeight: "normal" }}>
          Sign in to your Account
        </span>
        <Input
          size="large"
          placeholder="Username"
          prefix={<UserOutlined />}
          style={{ marginTop: 20 }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input.Password
          size="large"
          placeholder="Password"
          prefix={<KeyOutlined />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ marginTop: 10, marginBottom: 20 }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="primary" block size="large" onClick={(e) => {}}>
          Login
        </Button>

        <p
          style={{
            textAlign: "center",
            color: "GrayText",
            marginTop: 10,
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/forgotPassword");
          }}
        >
          Forgot password?
        </p>
      </Card>
    </div>
  );
}

export default LoginPageDesign;
