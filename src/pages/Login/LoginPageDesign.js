// Default react and react-router imports
import React from "react";
import { useNavigate } from "react-router-dom";

// Antd components imports
import { Card, Input, Button, Spin } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
} from "@ant-design/icons";

// Css design imports
import "./LoginPageCSS.css";

// Image imports
import casalogo from "../../assets/casa-logo.png";

/**
 * Custom component imports
 * @LoginPageLogic This page contains logic of this form
 */

import { LoginPageStates, login } from "./LoginPageLogic";

function LoginPageDesign() {
  const navigate = useNavigate();

  // Destructuring of logic variables/methods
  let { username, password, loading, setUsername, setPassword, setLoading } =
    LoginPageStates;

  return (
    <div className="login-container">
      <Card className="card-style">
        <div className="app-logo-container">
          <img src={casalogo} className="app-logo" />
        </div>

        <span className="span-login-first-text">Login | </span>
        <span className="span-login-second-text">Sign in to your Account</span>
        <Input
          size="large"
          placeholder="Username"
          prefix={<UserOutlined />}
          className="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input.Password
          size="large"
          placeholder="Password"
          prefix={<KeyOutlined />}
          value={password}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          className="password-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="primary" block size="large" onClick={login}>
          Login
        </Button>

        {loading ? (
          <div className="div-spin">
            <Spin />
          </div>
        ) : null}

        <p
          className="p-forgotpassword"
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
