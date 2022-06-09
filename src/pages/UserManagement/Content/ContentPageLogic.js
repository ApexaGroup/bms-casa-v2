import React, { useState } from "react";

// Antd components imports
import { Input, Button, Modal, Col, Row, Upload, Space, message } from "antd";

//antd icons import
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

// network handler
import handler from "../../../handlers/generalHandler";

function ContentPageLogic() {
  // useStates
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
  const [tblHeaders, setTblHeaders] = useState([
    {
      title: "Profile Image",
      dataIndex: "userProfileImage",
      key: "userProfileImage",
      render: (userProfileImage) => (
        <img src={userProfileImage} className="userProfileImage" />
      ),
    },
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setImageUrl(record.userProfileImage);
              setIsModalVisible(true);
              setIsEdit(true);
              setId(record.id);
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
          </Button>
          <a
            onClick={(e) => {
              e.preventDefault();
              deleteUserApiCall(record.id);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ]);

  // form handler
  const handleChangeData = (evt) => {
    const value = evt.target.value;

    setUserData({
      ...userData,
      [evt.target.name]: value,
    });
  };

  // reset states
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

  // method for showing modal
  const showModal = () => {
    setIsModalVisible(true);
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

  // handle file pick change
  const handleChange = (info) => {
    if (info.file.originFileObj) {
      uploadAPICall(info.file.originFileObj);
    }
  };

  // upload button to show in form
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

  // User form data
  const userFields = [
    {
      name: "username",
      placeholder: "Username",
      type: "text",
      className: "input-style",
      value: userData.username,
      method: handleChangeData,
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      className: "input-style",
      value: userData.password,
      method: handleChangeData,
    },

    {
      name: "firstName",
      placeholder: "first Name",
      type: "text",
      className: "input-style",
      value: userData.firstName,
      method: handleChangeData,
    },

    {
      name: "lastName",
      placeholder: "Last Name",
      type: "text",
      className: "input-style",
      value: userData.lastName,
      method: handleChangeData,
    },
    {
      name: "contactNo",
      placeholder: "Contact No",
      type: "text",
      className: "input-style",
      value: userData.contactNo,
      method: handleChangeData,
    },

    {
      name: "address",
      placeholder: "Address",
      type: "text",
      className: "input-style",
      value: userData.address,
      method: handleChangeData,
    },

    {
      name: "alternateNo",
      placeholder: "Alternate No",
      type: "text",
      className: "input-style",
      value: userData.alternateNo,
      method: handleChangeData,
    },

    {
      name: "defaultCompanyId",
      placeholder: "Default Company Id",
      type: "text",
      className: "input-style",
      value: userData.defaultCompanyId,
      method: handleChangeData,
    },

    {
      name: "city",
      placeholder: "City",
      type: "text",
      className: "input-style",
      value: userData.city,
      method: handleChangeData,
    },

    {
      name: "state",
      placeholder: "State",
      type: "text",
      className: "input-style",
      value: userData.state,
      method: handleChangeData,
    },

    {
      name: "zipcode",
      placeholder: "Zipcode",
      type: "text",
      className: "input-style",
      value: userData.zipcode,
      method: handleChangeData,
    },

    {
      name: "avatar",
      placeholder: "Zipcode",
      type: "upload",
      className: "avatar-uploader",
      value: userData.userProfileImage,
      method: handleChange,
    },
  ];

  // user modal for add and edit
  const UserModal = (
    <div>
      <Modal
        title={isEdit ? "Edit user" : "Add new user"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Row gutter={6}>
          <Col span={12}>
            <Input
              placeholder="Username"
              name="username"
              value={userData.username}
              type={"text"}
              className="input-style"
              onChange={handleChangeData}
            />
          </Col>
          <Col span={12}>
            <Input
              placeholder="Password"
              name="password"
              value={userData.password}
              type={"password"}
              className="input-style"
              onChange={handleChangeData}
            />
          </Col>
        </Row>
        <Row gutter={6}>
          <Col span={12}>
            <Input
              className="input-style"
              placeholder="First Name"
              name="firstName"
              value={userData.firstName}
              type={"text"}
              onChange={handleChangeData}
            />
          </Col>
          <Col span={12}>
            <Input
              className="input-style"
              placeholder="Last Name"
              name="lastName"
              value={userData.lastName}
              onChange={handleChangeData}
              type={"text"}
            />
          </Col>
        </Row>
        <Row gutter={6}>
          <Col span={12}>
            <Input
              className="input-style"
              placeholder="Contact No"
              name="contactNo"
              value={userData.contactNo}
              type={"phone"}
              onChange={handleChangeData}
            />
          </Col>
          <Col span={12}>
            <Input
              className="input-style"
              placeholder="Address"
              name="address"
              value={userData.address}
              type={"text"}
              onChange={handleChangeData}
            />
          </Col>
          <Col span={12}>
            <Input
              className="input-style"
              placeholder="Alternate No"
              name="alternateNo"
              value={userData.alternateNo}
              type={"phone"}
              onChange={handleChangeData}
            />
          </Col>
          <Col span={12}>
            <Input
              className="input-style"
              placeholder="Default Company ID"
              name="defaultCompanyId"
              value={userData.defaultCompanyId}
              onChange={handleChangeData}
              type={"text"}
            />
          </Col>
        </Row>
        <Row gutter={6}>
          <Col span={12}>
            <Input
              className="input-style"
              placeholder="City"
              name="city"
              value={userData.city}
              onChange={handleChangeData}
              type={"text"}
            />
          </Col>
          <Col span={12}>
            <Input
              className="input-style"
              placeholder="State"
              name="state"
              value={userData.state}
              onChange={handleChangeData}
              type={"text"}
            />
          </Col>
          <Col span={12}>
            <Input
              className="input-style"
              placeholder="Zipcode"
              name="zipcode"
              value={userData.zipcode}
              onChange={handleChangeData}
              type={"zipcode"}
            />
          </Col>
          <Col span={24}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>
      </Modal>
    </div>
  );

  // delete user api call
  const deleteUserApiCall = (id) => {
    setLoading(true);

    let updatebleData = {
      id: id,
    };

    handler
      .dataPost("/api/auth/deleteUser", updatebleData, {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          //handleOk();
          getUsersAPIcall();
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- updateUserAPICall", error);
      });
  };

  // add user api call
  const addUserAPICall = () => {
    setLoading(true);

    handler
      .dataPost("/api/auth/register", userData, {})
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

    // axios
    //   .post("/api/auth/register", userData)
    //   .then((response) => {
    //     setLoading(false);
    //     if (response.status == 200) {
    //       getUsersAPIcall();
    //     } else if (response.status == 400) {
    //       window.alert(response.data.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("There was an error!- addUserAPICall", error);
    //   });
  };

  // get user api call
  const getUsersAPIcall = () => {
    setLoading(true);

    handler
      .dataGet("/api/auth/getUsers", {})
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

    // axios
    //   .get("/api/auth/getUsers")
    //   .then((response) => {
    //     setLoading(false);
    //     if (response.status == 200) {
    //       setDataSource(response.data.data);
    //     } else if (response.status == 400) {
    //       window.alert(response.data.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("There was an error!- getUsersAPIcall", error);
    //   });
  };

  // update user api call
  const updateUserAPICall = () => {
    setLoading(true);

    let updatebleData = {
      ...userData,
      id: id,
    };

    handler
      .dataPost("/api/auth/updateUser", updatebleData, {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          //handleOk();
          getUsersAPIcall();
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- updateUserAPICall", error);
      });
  };

  // upload api call
  const uploadAPICall = (file) => {
    const formData = new FormData();
    formData.append("image", file);
    handler
      .dataPost("/api/auth/upload", formData, {})
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

  // states container
  const StatesContainer = {
    pageName,
    setPageName,
    dataSource,
    setDataSource,
    loading,
    setLoading,
    isEdit,
    setIsEdit,
    isModalVisible,
    setIsModalVisible,
    id,
    setId,
    imageUrl,
    setImageUrl,
    userData,
    setUserData,
    tblHeaders,
    setTblHeaders,
    handleChangeData,
    resetStates,
    deleteUserApiCall,
    handleChange,
    handleOk,
    getUsersAPIcall,
    updateUserAPICall,
    uploadAPICall,
    uploadButton,
    handleCancel,
    showModal,
    getUsersAPIcall,
    UserModal,
  };

  return StatesContainer;
}

export default ContentPageLogic;
