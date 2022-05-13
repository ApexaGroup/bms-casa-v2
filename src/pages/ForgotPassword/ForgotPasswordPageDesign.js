import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button } from "antd";
import "./ForgotPasswordPageCSS.css";
import casalogo from "../../assets/casa-logo.png";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
} from "@ant-design/icons";

function ForgotPasswordPageDesign() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  return (
    <div className="forgot-password-container">
      <Card className="card-style">
        <div style={{ textAlign: "center" }}>
          <img
            src={casalogo}
            style={{ width: 170, height: "auto", textAlign: "center" }}
          />
        </div>

        <span style={{ fontSize: 28, fontWeight: "bold" }}>
          Forgot Password?
        </span>
        <p style={{ fontSize: 20, fontWeight: "normal" }}>
          You can reset your password here
        </p>
        <Input
          size="large"
          placeholder="Username"
          prefix={<UserOutlined />}
          style={{ marginTop: 0, marginBottom: 20 }}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button type="primary" block size="large">
          Send password reset Link
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
