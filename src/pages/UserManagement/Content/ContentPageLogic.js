import React, { useState } from "react";

// Antd components imports
import {
  Input,
  Button,
  Modal,
  Col,
  Row,
  Upload,
  Space,
  message,
  Select,
  Switch,
  Popconfirm,
} from "antd";

//antd icons import
import {
  PlusOutlined,
  LoadingOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

// network handler
import handler from "../../../handlers/generalHandler";

function ContentPageLogic() {
  // useStates
  const { Option } = Select;
  const { TextArea } = Input;
  const [pageName, setPageName] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [cc, setCC] = useState([]);
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

  let [tblHeaders, setTblHeaders] = useState([]);

  const [ccData, setCCdata] = useState({
    construction_company_name: "",
    contact_person_name: "",
    contact_no: "",
    alternate_no: "",
    email: "",
    address: "",
    isActive: true,
    city: "",
    state: "",
    zipcode: "",
    notes: "",
  });

  const [pmData, setPmData] = useState({
    construction_company_id: "",
    project_manager_name: "",
    contact_no: "",
    cell_phone: "",
    email: "",
    alternate_email: "",
    address: "",
    isActive: true,
    city: "",
    state: "",
    zipcode: "",
    notes: "",
  });

  // table headers
  const userTblHeaders = [
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
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteAPICalls("user", record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const ccTblHeaders = [
    {
      title: "Construction company name",
      dataIndex: "construction_company_name",
      key: "construction_company_name",
    },

    {
      title: "Contact person name",
      dataIndex: "contact_person_name",
      key: "contact_person_name",
    },

    {
      title: "Contact no",
      dataIndex: "contact_no",
      key: "contact_no",
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
              setIsEdit(true);
              setId(record.id);
              setCCdata({
                construction_company_name: record.construction_company_name,
                contact_person_name: record.contact_person_name,
                contact_no: record.contact_no,
                alternate_no: record.alternate_no,
                email: record.email,
                address: record.address,
                isActive: true,
                city: record.city,
                state: record.state,
                zipcode: record.zipcode,
                notes: record.notes,
              });
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteAPICalls("construction_company", record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const pmTblHeaders = [
    {
      title: "Project manager name",
      dataIndex: "project_manager_name",
      key: "project_manager_name",
    },
    {
      title: "Contact no",
      dataIndex: "contact_no",
      key: "contact_no",
    },
    {
      title: "Cell phone",
      dataIndex: "cell_phone",
      key: "cell_phone",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
              setIsEdit(true);
              setId(record.id);
              setPmData({
                construction_company_id: record.construction_company_id,
                project_manager_name: record.project_manager_name,

                contact_no: record.contact_no,
                cell_phone: record.cell_phone,
                email: record.email,
                alternate_email: record.alternate_email,
                address: record.address,
                isActive: true,
                city: record.city,
                state: record.state,
                zipcode: record.zipcode,
                notes: record.notes,
              });
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteAPICalls("project_manager", record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // general fields
  const [generalFields, setGeneralFields] = useState([]);

  // form handler
  const handleChangeData = (evt) => {
    const value = evt.target.value;

    if (pageName === "user" || "role") {
      setUserData({
        ...userData,
        [evt.target.name]: value,
      });
    }

    if (pageName === "construction_company") {
      setCCdata({
        ...ccData,
        [evt.target.name]: value,
      });
    }

    if (pageName === "project_manager") {
      setPmData({
        ...pmData,
        [evt.target.name]: value,
      });
    }
  };

  // select handler
  const selectHandleChange = (value) => {
    // alert(value);
    setPmData({
      ...pmData,
      construction_company_id: value,
    });
  };

  // reset states
  const resetStates = () => {
    setIsEdit(false);
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

  // reset CC state
  const resetCCstates = () => {
    setIsEdit(false);
    setCCdata({
      construction_company_name: "",
      contact_person_name: "",
      contact_no: "",
      alternate_no: "",
      email: "",
      address: "",
      isActive: true,
      city: "",
      state: "",
      zipcode: "",
      notes: "",
    });
  };

  // reset PM states
  const resetPMstates = () => {
    setIsEdit(false);
    setPmData({
      construction_company_id: "",
      project_manager_name: "",
      contact_no: "",
      cell_phone: "",
      email: "",
      alternate_email: "",
      address: "",
      isActive: true,
      city: "",
      state: "",
      zipcode: "",
      notes: "",
    });
  };

  // method for showing modal
  const showModal = () => {
    setIsModalVisible(true);
    resetStates();
  };

  // method to be called when modal ok is clicked
  const handleOk = () => {
    setIsModalVisible(false);

    switch (pageName) {
      case "user":
        if (!isEdit) {
          addUserAPICall();
        } else {
          updateUserAPICall();
        }
        break;

      case "role":
        break;

      case "construction_company":
        if (!isEdit) {
          addConstructionCompanyAPICall();
        } else {
          updateConstructionCompanyAPICall();
          resetCCstates();
        }
        break;

      case "project_manager":
        if (!isEdit) {
          addProjectManagerAPICall();
        } else {
          updateProjectManagerAPICall();
          resetPMstates();
        }
        break;

      default:
        break;
    }
  };

  // method to be called when modal cancel is clicked
  const handleCancel = () => {
    setIsModalVisible(false);
    resetStates();
    resetCCstates();
    resetPMstates();
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

  // Construction Company form data // generalFields

  const ccFields = [
    {
      name: "construction_company_name",
      typeofinput: "input",
      placeholder: "Construction Company Name",
      type: "text",
      className: "input-style",
      value: ccData.construction_company_name,
      method: handleChangeData,
    },

    {
      name: "contact_person_name",
      typeofinput: "input",
      placeholder: "Contact Person Name",
      type: "text",
      className: "input-style",
      value: ccData.contact_person_name,
      method: handleChangeData,
    },

    {
      name: "contact_no",
      typeofinput: "input",
      placeholder: "Contact no",
      type: "text",
      className: "input-style",
      value: ccData.contact_no,
      method: handleChangeData,
    },

    {
      name: "alternate_no",
      typeofinput: "input",
      placeholder: "Alternate no",
      type: "text",
      className: "input-style",
      value: ccData.alternate_no,
      method: handleChangeData,
    },

    {
      name: "address",
      typeofinput: "input",
      placeholder: "Address",
      type: "text",
      className: "input-style",
      value: ccData.address,
      method: handleChangeData,
    },

    {
      name: "city",
      typeofinput: "input",
      placeholder: "City",
      type: "text",
      className: "input-style",
      value: ccData.city,
      method: handleChangeData,
    },

    {
      name: "state",
      typeofinput: "input",
      placeholder: "State",
      type: "text",
      className: "input-style",
      value: ccData.state,
      method: handleChangeData,
    },

    {
      name: "zipcode",
      typeofinput: "input",
      placeholder: "Zipcode",
      type: "text",
      className: "input-style",
      value: ccData.zipcode,
      method: handleChangeData,
    },

    {
      name: "notes",
      typeofinput: "textarea",
      placeholder: "Notes",
      type: "text",
      className: "input-style",
      value: ccData.notes,
      method: handleChangeData,
    },

    {
      name: "isActive",
      typeofinput: "switch",
      placeholder: "",
      type: "text",
      className: "input-style",
      value: ccData.isActive,
      method: handleChangeData,
    },
  ];

  // User form data // generalFields
  const userFields = [
    {
      name: "username",
      typeofinput: "input",
      placeholder: "Username",
      type: "text",
      className: "input-style",
      value: userData.username,
      method: handleChangeData,
    },
    {
      name: "password",
      typeofinput: "input",
      placeholder: "Password",
      type: "password",
      className: "input-style",
      value: userData.password,
      method: handleChangeData,
    },

    {
      name: "firstName",
      typeofinput: "input",
      placeholder: "first Name",
      type: "text",
      className: "input-style",
      value: userData.firstName,
      method: handleChangeData,
    },

    {
      name: "lastName",
      typeofinput: "input",
      placeholder: "Last Name",
      type: "text",
      className: "input-style",
      value: userData.lastName,
      method: handleChangeData,
    },
    {
      name: "contactNo",
      typeofinput: "input",
      placeholder: "Contact No",
      type: "text",
      className: "input-style",
      value: userData.contactNo,
      method: handleChangeData,
    },

    {
      name: "address",
      typeofinput: "input",
      placeholder: "Address",
      type: "text",
      className: "input-style",
      value: userData.address,
      method: handleChangeData,
    },

    {
      name: "alternateNo",
      typeofinput: "input",
      placeholder: "Alternate No",
      type: "text",
      className: "input-style",
      value: userData.alternateNo,
      method: handleChangeData,
    },

    {
      name: "defaultCompanyId",
      typeofinput: "input",
      placeholder: "Default Company Id",
      type: "text",
      className: "input-style",
      value: userData.defaultCompanyId,
      method: handleChangeData,
    },

    {
      name: "city",
      typeofinput: "input",
      placeholder: "City",
      type: "text",
      className: "input-style",
      value: userData.city,
      method: handleChangeData,
    },

    {
      name: "state",
      typeofinput: "input",
      placeholder: "State",
      type: "text",
      className: "input-style",
      value: userData.state,
      method: handleChangeData,
    },

    {
      name: "zipcode",
      typeofinput: "input",
      placeholder: "Zipcode",
      type: "text",
      className: "input-style",
      value: userData.zipcode,
      method: handleChangeData,
    },

    {
      name: "avatar",
      typeofinput: "upload",
      placeholder: "Zipcode",
      type: "upload",
      className: "avatar-uploader",
      value: userData.userProfileImage,
      method: handleChange,
    },
  ];

  const pmFields = [
    {
      name: "construction_company_id",
      typeofinput: "select",
      placeholder: "",
      type: "text",
      className: "input-style",
      value: pmData.construction_company_id,
      method: selectHandleChange,
    },

    {
      name: "project_manager_name",
      typeofinput: "input",
      placeholder: "Project manager name",
      type: "text",
      className: "input-style",
      value: pmData.project_manager_name,
      method: handleChangeData,
    },

    {
      name: "contact_no",
      typeofinput: "input",
      placeholder: "Contact no",
      type: "text",
      className: "input-style",
      value: pmData.contact_no,
      method: handleChangeData,
    },

    {
      name: "cell_phone",
      typeofinput: "input",
      placeholder: "Cell phone",
      type: "text",
      className: "input-style",
      value: pmData.cell_phone,
      method: handleChangeData,
    },

    {
      name: "email",
      typeofinput: "input",
      placeholder: "Email",
      type: "text",
      className: "input-style",
      value: pmData.email,
      method: handleChangeData,
    },

    {
      name: "alternate_email",
      typeofinput: "input",
      placeholder: "Alternate email",
      type: "text",
      className: "input-style",
      value: pmData.alternate_email,
      method: handleChangeData,
    },

    {
      name: "address",
      typeofinput: "input",
      placeholder: "Address",
      type: "text",
      className: "input-style",
      value: pmData.address,
      method: handleChangeData,
    },

    {
      name: "city",
      typeofinput: "input",
      placeholder: "City",
      type: "text",
      className: "input-style",
      value: pmData.city,
      method: handleChangeData,
    },

    {
      name: "state",
      typeofinput: "input",
      placeholder: "State",
      type: "text",
      className: "input-style",
      value: pmData.state,
      method: handleChangeData,
    },

    {
      name: "zipcode",
      typeofinput: "input",
      placeholder: "Zipcode",
      type: "text",
      className: "input-style",
      value: pmData.zipcode,
      method: handleChangeData,
    },

    {
      name: "notes",
      typeofinput: "textarea",
      placeholder: "Notes",
      type: "text",
      className: "input-style",
      value: pmData.notes,
      method: handleChangeData,
    },

    {
      name: "isActive",
      typeofinput: "switch",
      placeholder: "isActive",
      type: "text",
      className: "input-style",
      value: pmData.isActive,
      method: handleChangeData,
    },
  ];

  // user modal for add and edit
  const renderModal = (pageName, generalFields) => {
    if (pageName === "construction_company") {
      generalFields = ccFields;
    }

    if (pageName === "user") {
      generalFields = userFields;
    }

    if (pageName === "project_manager") {
      generalFields = pmFields;
    }

    const UserModal = (
      <div>
        <Modal
          title={isEdit ? `Edit ${pageName}` : `Add new ${pageName}`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
          destroyOnClose
        >
          <Row gutter={6}>
            {generalFields.map((record) => {
              switch (record.typeofinput) {
                case "upload":
                  return (
                    <Col span={24}>
                      <Upload
                        name={record.name}
                        listType="picture-card"
                        className={record.className}
                        showUploadList={false}
                        onChange={record.method}
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
                  );

                case "select":
                  return (
                    <Col span={12}>
                      <Select
                        style={{ width: "100%" }}
                        defaultValue={
                          isEdit
                            ? pmData.construction_company_id
                            : "Select Company"
                        }
                        onChange={selectHandleChange}
                      >
                        {cc.map((item) => {
                          return (
                            <Option value={item.id}>
                              {item.construction_company_name}
                            </Option>
                          );
                        })}
                      </Select>
                    </Col>
                  );

                case "switch":
                  return (
                    <Col span={24}>
                      <label>Active/Inactive </label>
                      <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                      />
                    </Col>
                  );

                case "input":
                  return (
                    <Col span={12}>
                      <Input
                        placeholder={record.placeholder}
                        name={record.name}
                        value={record.value}
                        type={record.type}
                        className={record.className}
                        onChange={record.method}
                      />
                    </Col>
                  );

                case "textarea":
                  return (
                    <Col span={12}>
                      <TextArea
                        rows={4}
                        placeholder={record.placeholder}
                        name={record.name}
                        value={record.value}
                        type={record.type}
                        className={record.className}
                        onChange={record.method}
                      />
                    </Col>
                  );
                default:
                  break;
              }
            })}
          </Row>
        </Modal>
      </div>
    );

    return UserModal;
  };

  // delete API calls
  const deleteAPICalls = (pageName, id) => {
    const updatebleData = {
      id: id,
    };
    switch (pageName) {
      case "user":
        setLoading(true);
        handler
          .dataPost("/user/deleteUser", updatebleData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getUsersAPIcall();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updateUserAPICall", error);
          });
        break;

      case "role":
        break;

      case "construction_company":
        setLoading(true);

        handler
          .dataPost("/construction-company/deleteCC", updatebleData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getConstructionCompanyAPIcall();
            } else if (response.status == 400) {
              message.warning(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updateUserAPICall", error);
          });
        break;
      case "project_manager":
        setLoading(true);

        handler
          .dataPost("/project-manager/deletePM", updatebleData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getProjectManagerAPICall();
            } else if (response.status == 400) {
              message.warning(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updateUserAPICall", error);
          });
        break;

      default:
        break;
    }
  };

  // add user api call
  const addUserAPICall = () => {
    setLoading(true);

    handler
      .dataPost("/auth/register", userData, {})
      .then((response) => {
        setLoading(false);
        if (response.status == 201) {
          message.success(response.data.message);
          getUsersAPIcall();
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- addUserAPICall", error);
      });
  };

  // add construction company api call
  const addConstructionCompanyAPICall = () => {
    setLoading(true);

    handler
      .dataPost("/construction-company/addCC", ccData, {})
      .then((response) => {
        setLoading(false);
        if (response.status == 201) {
          message.success("success");
          getConstructionCompanyAPIcall();
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- addUserAPICall", error);
      });
  };

  // update construction company api call
  const updateConstructionCompanyAPICall = () => {
    setLoading(true);

    let updatebleData = {
      ...ccData,
      id: id,
    };

    handler
      .dataPost("/construction-company/updateCC", updatebleData, {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          message.success(response.data.message);
          getConstructionCompanyAPIcall();
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- updateUserAPICall", error);
      });
  };

  // get project manager api call
  const getProjectManagerAPICall = () => {
    setLoading(true);
    handler
      .dataGet("/project-manager/getPMs", {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setDataSource(response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error(
          "There was an error!- getConstructionCompanyAPIcall",
          error
        );
      });
  };

  // update project manager api call
  const updateProjectManagerAPICall = () => {
    setLoading(true);

    let updatebleData = {
      ...pmData,
      id: id,
    };

    handler
      .dataPost("/project-manager/updatePM", updatebleData, {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          message.success(response.data.message);
          getProjectManagerAPICall();
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- updateUserAPICall", error);
      });
  };

  // add project manager api call
  const addProjectManagerAPICall = () => {
    setLoading(true);

    handler
      .dataPost("/project-manager/addPM", pmData, {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          message.success(response.data.message);
          getProjectManagerAPICall();
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- addUserAPICall", error);
      });
  };

  // get user api call
  const getUsersAPIcall = () => {
    setLoading(true);

    handler
      .dataGet("/user/getUsers", {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setDataSource(response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        message.error("error");
        console.error("There was an error!- getUsersAPIcall", error);
      });
  };

  //
  const getConstructionCompanyAPIcall = () => {
    setLoading(true);
    handler
      .dataGet("/construction-company/getCC", {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setDataSource(response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error(
          "There was an error!- getConstructionCompanyAPIcall",
          error
        );
      });
  };

  // get calls getAllData() getTblData()
  const getCall = (pageName) => {
    switch (pageName) {
      case "user":
        getUsersAPIcall();
        break;

      case "role":
        alert("role");
        break;

      case "construction_company":
        getConstructionCompanyAPIcall();
        break;

      case "project_manager":
        getCCforPM();
        getProjectManagerAPICall();
        break;

      default:
        break;
    }
  };

  // get list of Construction Company for Project Manager.
  // we will fill select component using below method
  const getCCforPM = () => {
    setLoading(true);
    handler
      .dataGet("/construction-company/getCC", {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setCC(response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error(
          "There was an error!- getConstructionCompanyAPIcall",
          error
        );
      });
  };

  // update user api call
  const updateUserAPICall = () => {
    setLoading(true);

    let updatebleData = {
      ...userData,
      id: id,
    };

    handler
      .dataPost("/user/updateUser", updatebleData, {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          //handleOk();
          message.success(response.data.message);
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
      .dataPost("/auth/upload", formData, {})
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
    handleChange,
    handleOk,
    getCall,
    updateUserAPICall,
    uploadAPICall,
    uploadButton,
    handleCancel,
    showModal,
    renderModal,
    userFields,
    ccFields,
    generalFields,
    setGeneralFields,
    userTblHeaders,
    ccTblHeaders,
    setTblHeaders,
    pmTblHeaders,
  };

  return StatesContainer;
}

export default ContentPageLogic;
