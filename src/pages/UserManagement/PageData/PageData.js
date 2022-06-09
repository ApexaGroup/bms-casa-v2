import React from "react";
import { Button, Space } from "antd";
import ContentPageLogic from "../Content/ContentPageLogic";

const pageData = () => {
  const {
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
  } = ContentPageLogic();

  const data = {
    user: {
      page: "user",
      buttonText: "Add User",
      tableColumns: [
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
                  setIsModalVisible(true);
                }}
              >
                Edit
              </Button>
              <a>Delete</a>
            </Space>
          ),
        },

        // {
        //   title: "Action",
        //   key: "action",
        //   render: (_, record) => (
        //     <Space size="middle">
        //       <a
        //         onClick={() => {
        //           setIsEdit(true);
        //           setId(record.id);
        //           setIsModalVisible(true);
        //           setImageUrl(record.userProfileImage);
        // setUserData({
        //   username: record.username,
        //   password: record.password,
        //   firstName: record.firstName,
        //   lastName: record.lastName,
        //   contactNo: record.contactNo,
        //   address: record.address,
        //   alternateNo: record.alternateNo,
        //   userProfileImage: record.userProfileImage,
        //   isActive: true,
        //   defaultCompanyId: record.defaultCompanyId,
        //   city: record.city,
        //   state: record.state,
        //   zipcode: record.zipcode,
        // });
        //         }}
        //       >
        //         Edit
        //       </a>
        //       <a>Delete</a>
        //     </Space>
        //   ),
        // },
      ],
    },
    role: {
      page: "role",
      buttonText: "Add Role",
      tableColumns: [
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
              <a>Edit</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ],
    },
  };

  return data;
};

export { pageData };
