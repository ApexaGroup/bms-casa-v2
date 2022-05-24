import React, { useState, useEffect } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { message, Space } from "antd";
import axios from "../../../axios";

const UserPageStates = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [id, setId] = useState("");
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

  const handleLoading = (loading) => {
    setLoading(loading);
  };

  const showModal = () => {
    setIsModalVisible(true);
    setIsEdit(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (!isEdit) {
      addUserAPICall();
    } else {
      updateUserAPICall();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      render: (userProfileImage) => (
        <img src={userProfileImage} className="userProfileImage" />
      ),
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setIsEdit(true);
              setId(record.id);
              setIsModalVisible(true);
              setImageUrl(record.userProfileImage);
              setUserData({
                username: record.username,
                password: record.password,
                firstName: record.firstName,
                lastName: record.lastName,
                contactNo: record.contactNo,
                address: record.address,
                alternateNo: record.alternateNo,
                userProfileImage: record.userProfileImage,
                isActive: true,
                defaultCompanyId: record.defaultCompanyId,
                city: record.city,
                state: record.state,
                zipcode: record.zipcode,
              });
            }}
          >
            Edit
          </a>
          <a>Delete</a>
        </Space>
      ),
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

  const handleChange = (info) => {
    if (info.file.originFileObj) {
      uploadAPICall(info.file.originFileObj);
    }
  };

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

  const StatesContainer = {
    //all states
    columns,
    dataSource,
    loading,
    isModalVisible,
    uploadButton,
    imageUrl,
    userData,
    isEdit,
    // all methods
    setIsEdit,
    handleLoading,
    getUsersAPIcall,
    showModal,
    handleOk,
    handleCancel,
    handleChange,
    setImageUrl,
    handleChangeData,
  };

  return StatesContainer;
};

export { UserPageStates };
