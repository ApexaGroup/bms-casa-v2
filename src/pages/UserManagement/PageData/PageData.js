import { Space } from "antd";

const pageData = {
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
            <a>Edit</a>
            <a>Delete</a>
          </Space>
        ),
      },
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

export default pageData;
