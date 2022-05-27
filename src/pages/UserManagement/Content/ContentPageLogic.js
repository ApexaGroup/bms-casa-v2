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
  const [isEdit, setIsEdit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    contactNo: "",
    address: "",
    alternateNo: "",
    userProfileImage: "",
    isActive: true,
    defaultCompanyId: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const resetStates = () => {
    setUserData({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      contactNo: "",
      address: "",
      alternateNo: "",
      userProfileImage: "",
      isActive: true,
      defaultCompanyId: "",
      city: "",
      state: "",
      zipcode: "",
    });

    setImageUrl("");
  };

  const handleChangeData = (evt) => {
    const value = evt.target.value;

    setUserData({
      ...userData,
      [evt.target.name]: value,
    });
  };

  useEffect(() => {
    getUsersAPIcall();
  }, []);

  // loading method
  const handleLoading = (loading) => {
    setLoading(loading);
  };

  // method for showing modal
  const showModal = () => {
    setIsModalVisible(true);
    setIsEdit(false);
    resetStates();
  };

  // method to be called when modal ok is clicked
  const handleOk = () => {
    setIsModalVisible(false);
    if (!isEdit) {
      addUserAPICall();
    } else {
      updateUserAPICall();
    }
  };

  // method to be called when modal cancel is clicked
  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  // upload button render method
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Image
      </div>
    </div>
  );

  // upload api call
  const uploadAPICall = (file) => {
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("/auth/upload", formData)
      .then((response) => {
        setLoading(true);
        if (response.data.status == 200) {
          setLoading(false);
          // setUserData({ userProfileImage: response.data.imageRef });
          userData.userProfileImage = response.data.imageRef;
          setImageUrl(response.data.imageRef);
          message.success(response.data.message, {
            position: "bottom-center",
          });
        } else {
          setLoading(false);
          message.error(response.data.message, { position: "bottom- center" });
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  // handlechange method for file picker
  const handleChange = (info) => {
    if (info.file.originFileObj) {
      uploadAPICall(info.file.originFileObj);
    }
  };

  // add user api call
  const addUserAPICall = () => {
    setLoading(true);

    axios
      .post("/auth/register", userData)
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          getUsersAPIcall();
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- addUserAPICall", error);
      });
  };

  // update user api call
  const updateUserAPICall = () => {
    setLoading(true);

    let updatebleData = {
      ...userData,
      id: id,
    };

    axios
      .post("/user/updateUser", updatebleData)
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          getUsersAPIcall();
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- updateUserAPICall", error);
      });
  };

  const handleEditOperation = (data) => {
    setIsEdit(true);
    setId(data.id);
    setIsModalVisible(!isModalVisible);
    setImageUrl(data.userProfileImage);
    setUserData({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      contactNo: data.contactNo,
      address: data.address,
      alternateNo: data.alternateNo,
      userProfileImage: data.userProfileImage,
      isActive: true,
      defaultCompanyId: data.defaultCompanyId,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
    });
  };

  const StatesContainer = {
    //all states
    pageName,
    dataSource,
    loading,
    isModalVisible,
    uploadButton,
    imageUrl,
    userData,
    isEdit,
    // all methods
    setIsModalVisible,
    setPageName,
    setIsEdit,
    handleLoading,
    getUsersAPIcall,
    showModal,
    handleOk,
    handleCancel,
    handleChange,
    setImageUrl,
    handleChangeData,
    handleEditOperation,
  };

  return StatesContainer;
};

export { ContentPageStates };
