import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const LoginPageStates = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUsername = (username) => {
    setUsername(username);
  };

  const handlePassword = (password) => {
    setPassword(password);
  };

  const handleLoading = (loading) => {
    setLoading(loading);
  };

  const loginAPIcall = () => {
    if (username && password) {
      const loginRequest = {
        username: username,
        password: password,
      };

      setLoading(true);

      axios
        .post("/auth/login", loginRequest)
        .then((response) => {
          console.log(response)
          setLoading(false);
          if (response.status === 200) {
            message.success(response.data.message)
            localStorage.setItem("token", response.data.access_token);
            window.location.reload()
          }

        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 401) {
            message.error(error.response.data.message);
          } else if (error.response.status === 400) {
            message.warning(error.response.data.message);
          } else if (error.response.status === 404) {
            message.warning(error.response.data.message);
          }
        });
    }
  };

  const StatesContainer = {
    //all states
    username,
    password,
    loading,
    // all methods
    handleUsername,
    handlePassword,
    handleLoading,
    loginAPIcall,
  };

  return StatesContainer;
};

export { LoginPageStates };
