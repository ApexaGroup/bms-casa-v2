import React, { useState } from "react";

const TheSidebarStates = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const StatesContainer = {
    //all states
    isModalVisible,
    // all methods
    setIsModalVisible,
    showModal,
    handleOk,
    handleCancel,
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return StatesContainer;
};

export { TheSidebarStates };
