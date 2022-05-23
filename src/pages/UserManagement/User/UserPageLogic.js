import React, { useState, useEffect } from "react";
import axios from "../../../axios";

const UserPageStates = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getUsersAPIcall();
  }, []);

  const handleLoading = (loading) => {
    setLoading(loading);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },

    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Alternate No",
      dataIndex: "alternateNo",
      key: "alternateNo",
    },

    {
      title: "Profile Image",
      dataIndex: "userProfileImage",
      key: "userProfileImage",
    },

    {
      title: "Default Company Id",
      dataIndex: "defaultCompanyId",
      key: "defaultCompanyId",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Zipcode",
      dataIndex: "zipcode",
      key: "zipcode",
    },
  ];

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
        console.error("There was an error!- loginAPIcall", error);
      });
  };

  const StatesContainer = {
    //all states
    columns,
    dataSource,
    loading,
    // all methods
    handleLoading,
    getUsersAPIcall,
  };

  return StatesContainer;
};

export { UserPageStates };
