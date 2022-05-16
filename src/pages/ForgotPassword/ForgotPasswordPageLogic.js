import React, { useState } from "react";

const ForgotPageStates = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const StatesContainer = {
    //all states
    username,
    loading,
    // all methods
    setUsername,
    setLoading,
  };

  return StatesContainer;
};

export { ForgotPageStates };
