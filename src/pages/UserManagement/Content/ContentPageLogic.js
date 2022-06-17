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
  const [companyId, setCompanyId] = useState("");
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

  const [otData, setOtData] = useState({
    title: "",
    price: "",
    unit: "",
    quoteNote: "",
    fieldDescription: "",
    plantid: "",
    isActive: true,
  });

  const [premiumRatesData, setPremiumRatesData] = useState({
    title: "",
    truckHireFee: "",
    plantOpeningFee: "",
    quoteNote: "",
    fieldDescription: "",
    plantid: "",
    isActive: true,
  });

  const [shortLoadData, setShortLoadData] = useState({
    title: "",
    quoteNote: "",
    fieldDescription: "",
    plantid: "",
    isActive: true,
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
              setCompanyId(record.construction_company_id);
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

  const otTblHeaders = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },

    {
      title: "Quote Note",
      dataIndex: "quoteNote",
      key: "quoteNote",
    },

    {
      title: "Field Description",
      dataIndex: "fieldDescription",
      key: "fieldDescription",
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
              setCompanyId(record.plantid);
              setOtData({
                title: record.title,
                price: record.price,
                unit: record.unit,
                quoteNote: record.quoteNote,
                fieldDescription: record.fieldDescription,
                plantid: record.plantid,
                isActive: true,
              });
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteAPICalls("over_time_fees", record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const prTblHeaders = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Truck Hire Fee",
      dataIndex: "truckHireFee",
      key: "truckHireFee",
    },
    {
      title: "Plant Opening Fee",
      dataIndex: "plantOpeningFee",
      key: "plantOpeningFee",
    },

    {
      title: "Quote Note",
      dataIndex: "quoteNote",
      key: "quoteNote",
    },

    {
      title: "Field Description",
      dataIndex: "fieldDescription",
      key: "fieldDescription",
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
              console.log(record);
              setCompanyId(record.plantid);
              setPremiumRatesData({
                title: record.title,
                truckHireFee: record.truckHireFee,
                plantOpeningFee: record.plantOpeningFee,
                quoteNote: record.quoteNote,
                fieldDescription: record.fieldDescription,
                plantid: record.plantid,
                isActive: true,
              });
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteAPICalls("premium_rates", record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const slTblHeaders = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Quote Note",
      dataIndex: "quoteNote",
      key: "quoteNote",
    },

    {
      title: "Field Description",
      dataIndex: "fieldDescription",
      key: "fieldDescription",
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
              console.log(record);
              setCompanyId(record.plantid);
              setShortLoadData({
                title: record.title,
                quoteNote: record.quoteNote,
                fieldDescription: record.fieldDescription,
                plantid: record.plantid,
                isActive: true,
              });
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteAPICalls("short_load_charges", record.id)}
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

    if (pageName === "over_time_fees") {
      setOtData({
        ...otData,
        [evt.target.name]: value,
      });
    }

    if (pageName === "premium_rates") {
      setPremiumRatesData({
        ...premiumRatesData,
        [evt.target.name]: value,
      });
    }

    if (pageName === "short_load_charges") {
      setShortLoadData({
        ...shortLoadData,
        [evt.target.name]: value,
      });
    }
  };

  // select handler
  const selectHandleChange = (value) => {
    // alert(value);
    if (pageName === "project_manager") {
      setPmData({
        ...pmData,
        construction_company_id: value,
      });
    }

    if (pageName === "over_time_fees") {
      setOtData({
        ...otData,
        plantid: value,
      });
    }
    if (pageName === "premium_rates") {
      setPremiumRatesData({
        ...premiumRatesData,
        plantid: value,
      });
    }

    if (pageName === "short_load_charges") {
      setShortLoadData({
        ...shortLoadData,
        plantid: value,
      });
    }
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
          addAPICalls("user");
        } else {
          updateAPICalls("user");
        }
        break;

      case "role":
        break;

      case "construction_company":
        if (!isEdit) {
          addAPICalls("construction_company");
        } else {
          updateAPICalls("construction_company");
        }
        break;

      case "project_manager":
        if (!isEdit) {
          addAPICalls("project_manager");
        } else {
          updateAPICalls("project_manager");
        }
        break;

      case "over_time_fees":
        if (!isEdit) {
          addAPICalls("over_time_fees");
        } else {
          updateAPICalls("over_time_fees");
        }
        break;

      case "premium_rates":
        if (!isEdit) {
          addAPICalls("premium_rates");
        } else {
          updateAPICalls("premium_rates");
        }
        break;

      case "short_load_charges":
        if (!isEdit) {
          addAPICalls("short_load_charges");
        } else {
          updateAPICalls("short_load_charges");
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

  const overtimefeesFields = [
    {
      name: "plant_id",
      typeofinput: "select",
      placeholder: "",
      type: "text",
      className: "input-style",
      value: otData.plantid,
      method: selectHandleChange,
    },

    {
      name: "title",
      typeofinput: "input",
      placeholder: "Title",
      type: "text",
      className: "input-style",
      value: otData.title,
      method: handleChangeData,
    },

    {
      name: "price",
      typeofinput: "input",
      placeholder: "Price",
      type: "text",
      className: "input-style",
      value: otData.price,
      method: handleChangeData,
    },
    {
      name: "unit",
      typeofinput: "input",
      placeholder: "unit",
      type: "text",
      className: "input-style",
      value: otData.unit,
      method: handleChangeData,
    },

    {
      name: "quoteNote",
      typeofinput: "textarea",
      placeholder: "Quote Notes",
      type: "text",
      className: "input-style",
      value: otData.quoteNote,
      method: handleChangeData,
    },

    {
      name: "fieldDescription",
      typeofinput: "textarea",
      placeholder: "Field Description",
      type: "text",
      className: "input-style",
      value: otData.fieldDescription,
      method: handleChangeData,
    },

    {
      name: "isActive",
      typeofinput: "switch",
      placeholder: "isActive",
      type: "text",
      className: "input-style",
      value: otData.isActive,
      method: handleChangeData,
    },
  ];

  const premiumRatesFields = [
    {
      name: "plant_id",
      typeofinput: "select",
      placeholder: "",
      type: "text",
      className: "input-style",
      value: premiumRatesData.plantid,
      method: selectHandleChange,
    },

    {
      name: "title",
      typeofinput: "input",
      placeholder: "Title",
      type: "text",
      className: "input-style",
      value: premiumRatesData.title,
      method: handleChangeData,
    },

    {
      name: "truckHireFee",
      typeofinput: "input",
      placeholder: "Truck Hire Fee",
      type: "text",
      className: "input-style",
      value: premiumRatesData.truckHireFee,
      method: handleChangeData,
    },
    {
      name: "plantOpeningFee",
      typeofinput: "input",
      placeholder: "Plant Opening Fee",
      type: "text",
      className: "input-style",
      value: premiumRatesData.plantOpeningFee,
      method: handleChangeData,
    },

    {
      name: "quoteNote",
      typeofinput: "textarea",
      placeholder: "Quote Notes",
      type: "text",
      className: "input-style",
      value: premiumRatesData.quoteNote,
      method: handleChangeData,
    },

    {
      name: "fieldDescription",
      typeofinput: "textarea",
      placeholder: "Field Description",
      type: "text",
      className: "input-style",
      value: premiumRatesData.fieldDescription,
      method: handleChangeData,
    },

    {
      name: "isActive",
      typeofinput: "switch",
      placeholder: "isActive",
      type: "text",
      className: "input-style",
      value: premiumRatesData.isActive,
      method: handleChangeData,
    },
  ];

  const shortLoadFields = [
    {
      name: "plant_id",
      typeofinput: "select",
      placeholder: "",
      type: "text",
      className: "input-style",
      value: shortLoadData.plantid,
      method: selectHandleChange,
    },

    {
      name: "title",
      typeofinput: "input",
      placeholder: "Title",
      type: "text",
      className: "input-style",
      value: shortLoadData.title,
      method: handleChangeData,
    },

    {
      name: "quoteNote",
      typeofinput: "textarea",
      placeholder: "Quote Notes",
      type: "text",
      className: "input-style",
      value: shortLoadData.quoteNote,
      method: handleChangeData,
    },

    {
      name: "fieldDescription",
      typeofinput: "textarea",
      placeholder: "Field Description",
      type: "text",
      className: "input-style",
      value: shortLoadData.fieldDescription,
      method: handleChangeData,
    },

    {
      name: "isActive",
      typeofinput: "switch",
      placeholder: "isActive",
      type: "text",
      className: "input-style",
      value: shortLoadData.isActive,
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

    if (pageName === "over_time_fees") {
      generalFields = overtimefeesFields;
    }

    if (pageName === "premium_rates") {
      generalFields = premiumRatesFields;
    }

    if (pageName === "short_load_charges") {
      generalFields = shortLoadFields;
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
                        defaultValue={isEdit ? companyId : "Select Company"}
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
            console.error("There was an error!- deleteUser", error);
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
            console.error("There was an error!- deleteCC", error);
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
            console.error("There was an error!- deletePM", error);
          });
        break;
      case "over_time_fees":
        setLoading(true);

        handler
          .dataPost("/over-time-fees/deleteOvertimeFees", updatebleData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getOvertimeFeesAPICall();
            } else if (response.status == 400) {
              message.warning(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- deleteOvertimeFees", error);
          });
        break;
      case "premium_rates":
        setLoading(true);

        handler
          .dataPost("premium-rates/deletePremiumRates", updatebleData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getPremiumRatesAPICall();
            } else if (response.status == 400) {
              message.warning(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updateUserAPICall", error);
          });
        break;

      case "short_load_charges":
        setLoading(true);
        handler
          .dataPost("/short-load-charges/deleteShortLoad", updatebleData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getShortLoadChargesAPICall();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- deleteShortLoad", error);
          });
        break;

      default:
        break;
    }
  };

  // update API calls
  const updateAPICalls = (pageName) => {
    switch (pageName) {
      case "user":
        setLoading(true);

        let updatebleDataUser = {
          ...userData,
          id: id,
        };

        handler
          .dataPost("/user/updateUser", updatebleDataUser, {})
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
        break;

      case "role":
        break;

      case "construction_company":
        setLoading(true);

        let updatebleDataConstCompany = {
          ...ccData,
          id: id,
        };

        handler
          .dataPost(
            "/construction-company/updateCC",
            updatebleDataConstCompany,
            {}
          )
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
            console.error("There was an error!- updateCC", error);
          });
        break;

      case "project_manager":
        setLoading(true);

        let updatebleDataProjectManager = {
          ...pmData,
          id: id,
        };

        handler
          .dataPost(
            "/project-manager/updatePM",
            updatebleDataProjectManager,
            {}
          )
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
            console.error("There was an error!- updatePM", error);
          });
        break;

      case "over_time_fees":
        setLoading(true);

        let updatableDataforOtf = {
          ...otData,
          id: id,
        };

        handler
          .dataPost(
            "/over-time-fees/updateOvertimeFees",
            updatableDataforOtf,
            {}
          )
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getOvertimeFeesAPICall();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updateOvertimeFees", error);
          });
        break;

      case "premium_rates":
        setLoading(true);

        let updatableDataforPr = {
          ...premiumRatesData,
          id: id,
        };

        handler
          .dataPost("/premium-rates/updatePremiumRates", updatableDataforPr, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getPremiumRatesAPICall();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updatePremiumRates", error);
          });
        break;

      case "short_load_charges":
        setLoading(true);

        let updatableDataforSl = {
          ...shortLoadData,
          id: id,
        };

        handler
          .dataPost(
            "/short-load-charges/updateShortLoad",
            updatableDataforSl,
            {}
          )
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getShortLoadChargesAPICall();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updateShortLoad", error);
          });
        break;

      default:
        break;
    }
  };

  // add API calls
  const addAPICalls = (pageName) => {
    switch (pageName) {
      case "user":
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
        break;

      case "role":
        break;

      case "construction_company":
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
            console.error(
              "There was an error!- addConstructionCompanyAPICall",
              error
            );
          });
        break;

      case "project_manager":
        setLoading(true);

        handler
          .dataPost("/project-manager/addPM", pmData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 201) {
              message.success(response.data.message);
              getProjectManagerAPICall();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error(
              "There was an error!- addProjectManagerAPICall",
              error
            );
          });
        break;
      case "over_time_fees":
        setLoading(true);

        handler
          .dataPost("/over-time-fees/addOvertimeFees", otData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 201) {
              message.success(response.data.message);
              getOvertimeFeesAPICall();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- addOvertimeFeesAPICall", error);
          });
        break;
      case "premium_rates":
        setLoading(true);

        handler
          .dataPost("/premium-rates/addPremiumRates", premiumRatesData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 201) {
              message.success(response.data.message);
              getPremiumRatesAPICall();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- addOvertimeFeesAPICall", error);
          });
        break;

      case "short_load_charges":
        setLoading(true);

        handler
          .dataPost("/short-load-charges/addShortLoad", shortLoadData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 201) {
              message.success(response.data.message);
              getShortLoadChargesAPICall();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- addShortLoad", error);
          });
        break;
      default:
        break;
    }
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

  // get over time fees list api call
  const getOvertimeFeesAPICall = () => {
    setLoading(true);
    handler
      .dataGet("/over-time-fees/getOvertimeFees", {})
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

  // get premium rates list api call
  const getPremiumRatesAPICall = () => {
    setLoading(true);
    handler
      .dataGet("/premium-rates/getPremiumRates", {})
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

  // get project manager api call
  const getShortLoadChargesAPICall = () => {
    setLoading(true);
    handler
      .dataGet("/short-load-charges/getShortLoad", {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setDataSource(response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getShortLoadChargesAPICall", error);
      });
  };

  // get user list api call
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

  // get construction company list api call
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
  const getAllData = (pageName) => {
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
        getConstructionCompanyForProjectManager();
        getProjectManagerAPICall();
        break;

      case "over_time_fees":
        getConstructionCompanyForProjectManager();
        getOvertimeFeesAPICall();
        break;

      case "premium_rates":
        getConstructionCompanyForProjectManager();
        getPremiumRatesAPICall();
        break;

      case "short_load_charges":
        getConstructionCompanyForProjectManager();
        getShortLoadChargesAPICall();
        break;

      default:
        break;
    }
  };

  // get list of Construction Company for Project Manager.
  // we will fill select component using below method
  const getConstructionCompanyForProjectManager = () => {
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
    getAllData,
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
    otTblHeaders,
    prTblHeaders,
    slTblHeaders,
  };

  return StatesContainer;
}

export default ContentPageLogic;
