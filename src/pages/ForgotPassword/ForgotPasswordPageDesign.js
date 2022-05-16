// Default react and react-router imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Antd components imports
import { Card, Input, Button, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";

// Css design imports
import "./ForgotPasswordPageCSS.css";

/**
 * Custom component imports
 * @ForgotPasswordPageLogic This page contains logic of this form
 * @Logo This component renders a logo
 * @Loader This component will render a loader from Spin Antd
 */

import { ForgotPageStates } from "./ForgotPasswordPageLogic";
import Logo from "../../components/Logo/Logo";
import Loader from "../../components/Loader/Loader";

function ForgotPasswordPageDesign() {
  const navigate = useNavigate();

  // Destructuring of logic variables/methods
  let { username, loading, setUsername, setLoading } = ForgotPageStates;

  return (
    <div className="forgot-password-container">
      <Card className="card-style">
        <Logo />

        <span className="span-title">Forgot Password?</span>
        <p className="p-subtitle">You can reset your password here</p>
        <Input
          size="large"
          placeholder="Username"
          value={username}
          prefix={<UserOutlined />}
          className="input-username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button type="primary" block size="large">
          Send password reset Link
        </Button>

        {loading ? <Loader /> : null}

        <p
          className="p-logintoAccount"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Login to your Account
        </p>
      </Card>
    </div>
  );
}

export default ForgotPasswordPageDesign;
