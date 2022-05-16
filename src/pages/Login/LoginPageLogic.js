import React, { useState } from "react";

const login = () => {
  console.log("success");
};

const LoginPageStates = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const StatesContainer = {
    //all states
    username,
    password,
    loading,
    // all methods
    setUsername,
    setPassword,
    setLoading,
  };

  return StatesContainer;
};

export { LoginPageStates, login };
