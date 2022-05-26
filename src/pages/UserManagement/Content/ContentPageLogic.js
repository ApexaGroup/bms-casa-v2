// Default react and react-router imports
import React, { useState, useEffect } from "react";

//antd icons import
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

// antd components imports
import { message, Space } from "antd";

// axios
import axios from "../../../axios";

const ContentPageStates = () => {
  const [pageName, setPageName] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    switch (pageName) {
      case "user":
        getUsersAPIcall();
        break;

      case "role":
        break;

      default:
        break;
    }
  }, [pageName]);

  // get users api call
  const getUsersAPIcall = () => {
    setLoading(true);

    axios
      .get("/user/getUsers")
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setDataSource(response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getUsersAPIcall", error);
      });
  };

  const StatesContainer = {
    pageName,
    setPageName,
    dataSource,
  };

  return StatesContainer;
};

export { ContentPageStates };
