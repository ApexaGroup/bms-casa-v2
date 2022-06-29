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
          setLoading(false);
          if (response.status == 200) {
            localStorage.setItem("token", response.data.access_token);

            navigate("/dashboard");
          } else if (response.status == 400) {
            window.alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("There was an error!- loginAPIcall", error);
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
