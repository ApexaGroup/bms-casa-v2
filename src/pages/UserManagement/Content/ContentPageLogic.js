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
  Tabs,
  Table,
} from "antd";

//antd icons import
import {
  PlusOutlined,
  LoadingOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

// constant data import
import { Constant } from "../../../Utils/Constant";

// network handler
import handler from "../../../handlers/generalHandler";

function ContentPageLogic() {
  // useStates
  const { Option } = Select;
  const { TextArea } = Input;
  const { TabPane } = Tabs;
  const [pageName, setPageName] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [cc, setCC] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [leadModalVisible, setLeadModalVisible] = useState(false);
  const [followupModalVisible, setFollowupModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [documentId, setDocumentId] = useState("");
  const { Type, AirType, StoneType } = Constant();
  const [childDataSource, setChildDataSource] = useState([]);
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

  const [leads, setLeads] = useState([]);

  const [auditLogs, setAuditLogs] = useState([]);
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

  const [extraChargesData, setExtraChargesData] = useState({
    title: "",
    price: "",
    unit: "",
    quoteNote: "",
    fieldDescription: "",
    plantid: "",
    isActive: true,
  });

  const [mixDesignData, setMixDesignData] = useState({
    mixDesignName: "",
    mixDesignCode: "",
    wcRatio: "",
    documentPath: "",
    minRate: "",
    stoneType: "",
    airType: "",
    proportions: "",
    status: "status",
    internalDesignType: "",
    pumpMixtestingLabName: "",
    expirationDate: "",
    psi: "",
    mixType: "",
    plantid: "1",
    isActive: true,
  });

  const [specialMixDesignData, setSpecialMixDesignData] = useState({
    mixDesignName: "",
    mixDesignCode: "",
    wcRatio: "",
    documentPath: "",
    minRate: "",
    stoneType: "",
    airType: "",
    proportions: "",
    status: "status",
    internalDesignType: "",
    pumpMixtestingLabName: "",
    expirationDate: "",
    psi: "",
    mixType: "",
    plantid: "1",
    isActive: true,
  });

  const [addressData, setAddressData] = useState({
    address: "",
    cross_street: "",
    borough: "",
    state: "",
    zipcode: "",
    isActive: true,
  });

  const [leadInformationData, setLeadInformationData] = useState({
    leadTitle: "",
    address: "",
    status: "",
    startDate: "",
    endDate: "",
    BidDueDate: "",
    estimatedYards: "",
    notes: "",
    isActive: true,
  });

  const [followupData, setFollowupData] = useState({
    lead_id: "",
    contactDate: "",
    contactPersonName: "",
    description: "",
    contactNo: "",
    nextMeetingDate: "",
    typeOfContact: "",
    email: "",
    onSiteVisit: "",
    section_name: "",
  });

  const [leadStatusData, setLeadStatusData] = useState([
    {
      title: "Out to Bid",
    },
    {
      title: "Low Bidder",
    },
    {
      title: "Pending Award",
    },
    {
      title: "Notice to Proceed",
    },
    {
      title: "Close",
    },
    {
      title: "Opportunity Created",
    },
    {
      title: "Open",
    },
  ]);

  const [typeOfContactData, setTypeOfContactData] = useState([
    {
      title: "Email",
    },
    {
      title: "Phone",
    },
    {
      title: "Onsite Visit",
    },
  ]);

  const [addresslist, setaddressList] = useState([]);

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

  const ecTblHeaders = [
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
              setExtraChargesData({
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
            onConfirm={() => deleteAPICalls("extra_charges", record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const mdTblHeaders = [
    {
      title: "Mix Design Name",
      dataIndex: "mixDesignName",
      key: "mixDesignName",
    },
    {
      title: "Mix Design Code",
      dataIndex: "mixDesignCode",
      key: "mixDesignCode",
    },
    {
      title: "Min Rate",
      dataIndex: "minRate",
      key: "minRate",
    },

    {
      title: "Stone Type",
      dataIndex: "stoneType",
      key: "stoneType",
    },

    {
      title: "Air Type",
      dataIndex: "airType",
      key: "airType",
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

              setMixDesignData({
                mixDesignName: record.mixDesignName,
                mixDesignCode: record.mixDesignCode,
                wcRatio: record.wcRatio,
                documentPath: record.documentPath,
                minRate: record.minRate,
                stoneType: record.stoneType,
                airType: record.airType,
                proportions: record.proportions,
                status: record.status,
                internalDesignType: record.internalDesignType,
                pumpMixtestingLabName: record.pumpMixtestingLabName,
                expirationDate: record.expirationDate,
                psi: record.psi,
                mixType: record.mixType,
                plantid: record.plantid,
                isActive: record.isActive,
              });
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteAPICalls("house_mix_design", record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const smdTblHeaders = [
    {
      title: "Mix Design Name",
      dataIndex: "mixDesignName",
      key: "mixDesignName",
    },
    {
      title: "Mix Design Code",
      dataIndex: "mixDesignCode",
      key: "mixDesignCode",
    },
    {
      title: "Min Rate",
      dataIndex: "minRate",
      key: "minRate",
    },

    {
      title: "Stone Type",
      dataIndex: "stoneType",
      key: "stoneType",
    },

    {
      title: "Air Type",
      dataIndex: "airType",
      key: "airType",
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

              setSpecialMixDesignData({
                mixDesignName: record.mixDesignName,
                mixDesignCode: record.mixDesignCode,
                wcRatio: record.wcRatio,
                documentPath: record.documentPath,
                minRate: record.minRate,
                stoneType: record.stoneType,
                airType: record.airType,
                proportions: record.proportions,
                status: record.status,
                internalDesignType: record.internalDesignType,
                pumpMixtestingLabName: record.pumpMixtestingLabName,
                expirationDate: record.expirationDate,
                psi: record.psi,
                mixType: record.mixType,
                plantid: record.plantid,
                isActive: record.isActive,
              });
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteAPICalls("special_mix_design", record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const addressTblHeaders = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Cross Sreet",
      dataIndex: "cross_street",
      key: "cross_street",
    },
    {
      title: "Borough",
      dataIndex: "borough",
      key: "borough",
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
          <Button
            onClick={(e) => {
              e.preventDefault();
              setIsModalVisible(true);
              setIsEdit(true);
              setId(record.id);

              setAddressData({
                address: record.address,
                cross_street: record.cross_street,
                borough: record.borough,
                state: record.state,
                zipcode: record.zipcode,
                isActive: record.isActive,
              });
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteAPICalls("address", record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const leadInfoTblHeaders = [
    {
      title: "Lead",
      dataIndex: "leadTitle",
      key: "leadTitle",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },

    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },

    {
      title: "Bid Due Date",
      dataIndex: "BidDueDate",
      key: "BidDueDate",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setLeadModalVisible(true);
              setIsEdit(true);
              setId(record.id);

              setLeadInformationData({
                leadTitle: record.leadTitle,
                address: record.address,
                status: record.status,
                startDate: record.startDate,
                endDate: record.endDate,
                BidDueDate: record.BidDueDate,
                estimatedYards: record.estimatedYards,
                notes: record.notes,
                isActive: true,
              });
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteAPICalls("lead", record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const followupTblHeaders = [
    {
      title: "Contact Date",
      dataIndex: "contactDate",
      key: "contactDate",
    },
    {
      title: "Lead Name",
      dataIndex: "lead_name",
      key: "lead_name",
    },
    {
      title: "Contact Person Name",
      dataIndex: "contactPersonName",
      key: "contactPersonName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
    },

    {
      title: "Next Meeting Date",
      dataIndex: "nextMeetingDate",
      key: "nextMeetingDate",
    },

    {
      title: "Type Of Contact",
      dataIndex: "typeOfContact",
      key: "typeOfContact",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setFollowupModalVisible(true);
              setIsEdit(true);
              setId(record.id);

              setFollowupData({
                lead_id: record.lead_id,
                contactDate: record.contactDate,
                contactPersonName: record.contactPersonName,
                description: record.description,
                contactNo: record.contactNo,
                nextMeetingDate: record.nextMeetingDate,
                typeOfContact: record.typeOfContact,
                email: record.email,
                onSiteVisit: record.onSiteVisit,
                section_name: record.section_name,
              });
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteAPICalls("followup", record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const auditLogsTblHeaders = [
    {
      title: "Person Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Operation Name",
      dataIndex: "operationName",
      key: "operationName",
    },
    {
      title: "Files",
      dataIndex: "files",
      key: "files",
    },
    {
      title: "Date",
      dataIndex: "createdOn",
      key: "createdOn",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            View
          </Button>
          {/* <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteAPICalls("followup", record.id)}
          >
            <a>Delete</a>
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

  // general fields
  const [generalFields, setGeneralFields] = useState([]);

  // tab change listner
  const onChange = (key) => {
    if (key == 1) {
    } else if (key == 2) {
      getFollowups("lead");
    } else if (key == 3) {
      getAllData("auditlogs");
    }
  };

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

    if (pageName === "extra_charges") {
      setExtraChargesData({
        ...extraChargesData,
        [evt.target.name]: value,
      });
    }

    if (pageName === "house_mix_design") {
      setMixDesignData({
        ...mixDesignData,
        [evt.target.name]: value,
      });
    }

    if (pageName === "special_mix_design") {
      setSpecialMixDesignData({
        ...specialMixDesignData,
        [evt.target.name]: value,
      });
    }

    if (pageName === "address") {
      setAddressData({
        ...addressData,
        [evt.target.name]: value,
      });
    }

    if (pageName === "lead") {
      setLeadInformationData({
        ...leadInformationData,
        [evt.target.name]: value,
      });
    }
  };

  // form handler child
  const followUpHandleChangeData = (evt) => {
    const value = evt.target.value;
    setFollowupData({
      ...followupData,
      [evt.target.name]: value,
    });
  };

  // select handler
  const selectHandleChange = (value, name) => {
    console.log(value);
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

    if (pageName === "extra_charges") {
      setExtraChargesData({
        ...extraChargesData,
        plantid: value,
      });
    }

    if (pageName === "house_mix_design") {
      console.log(name);
      switch (name) {
        case "internalDesignType":
          setMixDesignData({
            ...mixDesignData,
            internalDesignType: value,
          });
          break;

        case "stoneType":
          setMixDesignData({
            ...mixDesignData,
            stoneType: value,
          });
          break;

        case "airType":
          setMixDesignData({
            ...mixDesignData,
            airType: value,
          });
          break;

        default:
          break;
      }
    }

    if (pageName === "special_mix_design") {
      switch (name) {
        case "internalDesignType":
          setSpecialMixDesignData({
            ...specialMixDesignData,
            internalDesignType: value,
          });
          break;

        case "stoneType":
          setSpecialMixDesignData({
            ...specialMixDesignData,
            stoneType: value,
          });
          break;

        case "airType":
          setSpecialMixDesignData({
            ...specialMixDesignData,
            airType: value,
          });
          break;

        default:
          break;
      }
    }

    if (pageName === "lead") {
      switch (name) {
        case "select_address":
          setLeadInformationData({
            ...leadInformationData,
            address: value,
          });
          break;

        case "select_status":
          setLeadInformationData({
            ...leadInformationData,
            status: value,
          });
          break;

        case "select_type_of_contact":
          setFollowupData({
            ...followupData,
            typeOfContact: value,
          });
          break;

        case "select_lead":
          setFollowupData({
            ...followupData,
            lead_id: value,
          });

        default:
          break;
      }
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

  // reset overtime states
  const resetOtStates = () => {
    setIsEdit(false);
    setOtData({
      title: "",
      price: "",
      unit: "",
      quoteNote: "",
      fieldDescription: "",
      plantid: "",
      isActive: true,
    });
  };

  // reset premium rates states
  const resetPrStates = () => {
    setIsEdit(false);
    setPremiumRatesData({
      title: "",
      truckHireFee: "",
      plantOpeningFee: "",
      quoteNote: "",
      fieldDescription: "",
      plantid: "",
      isActive: true,
    });
  };

  // reset short load states
  const resetSlStates = () => {
    setIsEdit(false);
    setShortLoadData({
      title: "",
      quoteNote: "",
      fieldDescription: "",
      plantid: "",
      isActive: true,
    });
  };

  // reset extra charges states
  const resetEcStates = () => {
    setIsEdit(false);
    setExtraChargesData({
      title: "",
      price: "",
      unit: "",
      quoteNote: "",
      fieldDescription: "",
      plantid: "",
      isActive: true,
    });
  };

  // reset mix design states
  const resetMdStates = () => {
    setMixDesignData({
      mixDesignName: "",
      mixDesignCode: "",
      wcRatio: "",
      documentPath: "",
      minRate: "",
      stoneType: "",
      airType: "",
      proportions: "",
      status: "",
      internalDesignType: "",
      pumpMixtestingLabName: "",
      expirationDate: "",
      psi: "",
      mixType: "",
      plantid: "",
      isActive: true,
    });
  };

  // reset special mix design states
  const resetSMdStates = () => {
    setSpecialMixDesignData({
      mixDesignName: "",
      mixDesignCode: "",
      wcRatio: "",
      documentPath: "",
      minRate: "",
      stoneType: "",
      airType: "",
      proportions: "",
      status: "",
      internalDesignType: "",
      pumpMixtestingLabName: "",
      expirationDate: "",
      psi: "",
      mixType: "",
      plantid: "",
      isActive: true,
    });
  };

  // reset address states
  const resetAddressStates = () => {
    setAddressData({
      address: "",
      cross_street: "",
      borough: "",
      state: "",
      zipcode: "",
      isActive: true,
    });
  };

  // reset lead-information states
  const resetLeadInfoStates = () => {
    setLeadInformationData({
      leadTitle: "",
      address: "",
      status: "",
      startDate: "",
      endDate: "",
      BidDueDate: "",
      estimatedYards: "",
      notes: "",
      isActive: true,
    });
  };

  // method for showing modal
  const showModal = () => {
    if (pageName === "lead") {
      setLeadModalVisible(true);
    } else {
      setIsModalVisible(true);
    }

    resetStates();
  };

  // method for showing child modal
  const showChildModal = () => {
    setFollowupModalVisible(true);
  };

  // method to be called when modal ok is clicked
  const handleOk = () => {
    setIsModalVisible(false);
    setLeadModalVisible(false);
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

      case "extra_charges":
        if (!isEdit) {
          addAPICalls("extra_charges");
        } else {
          updateAPICalls("extra_charges");
        }
        break;

      case "house_mix_design":
        if (!isEdit) {
          addAPICalls("house_mix_design");
        } else {
          updateAPICalls("house_mix_design");
        }
        break;

      case "special_mix_design":
        if (!isEdit) {
          addAPICalls("special_mix_design");
        } else {
          updateAPICalls("special_mix_design");
        }
        break;

      case "address":
        if (!isEdit) {
          addAPICalls("address");
        } else {
          updateAPICalls("address");
        }
        break;

      case "lead":
        if (!isEdit) {
          addAPICalls("lead");
        } else {
          updateAPICalls("lead");
        }
        break;
      default:
        break;
    }
  };

  // followup handleok
  const followUpHandleOk = () => {
    setFollowupModalVisible(false);
    if (!isEdit) {
      addAPICalls("followup");
    } else {
      updateAPICalls("followup");
    }
  };

  // followup handleCancel
  const followuphandleCancel = () => {
    setFollowupModalVisible(false);
  };

  // method to be called when modal cancel is clicked
  const handleCancel = () => {
    setIsModalVisible(false);
    setLeadModalVisible(false);
    resetStates();
    resetCCstates();
    resetPMstates();
    resetOtStates();
    resetPrStates();
    resetSlStates();
    resetEcStates();
    resetMdStates();
    resetSMdStates();
    resetAddressStates();
    resetLeadInfoStates();
  };

  // handle file pick change
  const handleChange = (info, pageName) => {
    if (info.file.originFileObj) {
      switch (pageName) {
        case "user":
          uploadAPICall(info.file.originFileObj, "profile");
          break;

        case "house_mix_design":
          console.log("uploa");
          uploadAPICall(info.file.originFileObj, "houseMixDesign");
          break;

        case "special_mix_design":
          uploadAPICall(info.file.originFileObj, "specialMixDesign");
          break;

        default:
          break;
      }
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
        {pageName === "user" ? "Upload Image" : "Design Document"}
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

  const extraChargesFields = [
    {
      name: "plant_id",
      typeofinput: "select",
      placeholder: "",
      type: "text",
      className: "input-style",
      value: extraChargesData.plantid,
      method: selectHandleChange,
    },

    {
      name: "title",
      typeofinput: "input",
      placeholder: "Title",
      type: "text",
      className: "input-style",
      value: extraChargesData.title,
      method: handleChangeData,
    },

    {
      name: "price",
      typeofinput: "input",
      placeholder: "Price",
      type: "text",
      className: "input-style",
      value: extraChargesData.price,
      method: handleChangeData,
    },
    {
      name: "unit",
      typeofinput: "input",
      placeholder: "unit",
      type: "text",
      className: "input-style",
      value: extraChargesData.unit,
      method: handleChangeData,
    },

    {
      name: "quoteNote",
      typeofinput: "textarea",
      placeholder: "Quote Notes",
      type: "text",
      className: "input-style",
      value: extraChargesData.quoteNote,
      method: handleChangeData,
    },

    {
      name: "fieldDescription",
      typeofinput: "textarea",
      placeholder: "Field Description",
      type: "text",
      className: "input-style",
      value: extraChargesData.fieldDescription,
      method: handleChangeData,
    },

    {
      name: "isActive",
      typeofinput: "switch",
      placeholder: "isActive",
      type: "text",
      className: "input-style",
      value: extraChargesData.isActive,
      method: handleChangeData,
    },
  ];

  const mixDesignFields = [
    {
      name: "mixDesignName",
      typeofinput: "input",
      placeholder: "Mix Design Name",
      type: "text",
      className: "input-style",
      value: mixDesignData.mixDesignName,
      method: handleChangeData,
    },

    {
      name: "pumpMixtestingLabName",
      typeofinput: "input",
      placeholder: "Pump Mix testing Lab Name",
      type: "text",
      className: "input-style",
      value: mixDesignData.pumpMixtestingLabName,
      method: handleChangeData,
    },

    {
      name: "minRate",
      typeofinput: "input",
      placeholder: "Min Rate",
      type: "text",
      className: "input-style",
      value: mixDesignData.minRate,
      method: handleChangeData,
    },

    {
      name: "expirationDate",
      typeofinput: "input",
      placeholder: "Expiration Date",
      type: "date",
      className: "input-style",
      value: mixDesignData.expirationDate,
      method: handleChangeData,
    },
    {
      name: "internalDesignType",
      typeofinput: "select",
      placeholder: "Internal Design Type",
      type: "text",
      className: "input-style",
      value: mixDesignData.internalDesignType,
      method: selectHandleChange,
    },

    {
      name: "mixDesignCode",
      typeofinput: "input",
      placeholder: "Mix Code",
      type: "text",
      className: "input-style",
      value: mixDesignData.mixDesignCode,
      method: handleChangeData,
    },

    {
      name: "stoneType",
      typeofinput: "select",
      placeholder: "Stone Type",
      type: "text",
      className: "input-style",
      value: mixDesignData.stoneType,
      method: selectHandleChange,
    },

    {
      name: "airType",
      typeofinput: "select",
      placeholder: "Air Type",
      type: "text",
      className: "input-style",
      value: mixDesignData.airType,
      method: selectHandleChange,
    },

    {
      name: "psi",
      typeofinput: "input",
      placeholder: "PSI",
      type: "text",
      className: "input-style",
      value: mixDesignData.psi,
      method: handleChangeData,
    },

    {
      name: "wcRatio",
      typeofinput: "input",
      placeholder: "W/C Ratio",
      type: "text",
      className: "input-style",
      value: mixDesignData.wcRatio,
      method: handleChangeData,
    },

    {
      name: "proportions",
      typeofinput: "input",
      placeholder: "Proportions",
      type: "text",
      className: "input-style",
      value: mixDesignData.proportions,
      method: handleChangeData,
    },

    {
      name: "avatar",
      typeofinput: "upload",
      placeholder: "Upload Document",
      type: "upload",
      className: "avatar-uploader",
      value: mixDesignData.documentPath,
      method: handleChange,
    },
  ];

  const specialMixDesignFields = [
    {
      name: "mixDesignName",
      typeofinput: "input",
      placeholder: "Mix Design Name",
      type: "text",
      className: "input-style",
      value: specialMixDesignData.mixDesignName,
      method: handleChangeData,
    },

    {
      name: "pumpMixtestingLabName",
      typeofinput: "input",
      placeholder: "Pump Mix testing Lab Name",
      type: "text",
      className: "input-style",
      value: specialMixDesignData.pumpMixtestingLabName,
      method: handleChangeData,
    },

    {
      name: "minRate",
      typeofinput: "input",
      placeholder: "Min Rate",
      type: "text",
      className: "input-style",
      value: specialMixDesignData.minRate,
      method: handleChangeData,
    },

    {
      name: "expirationDate",
      typeofinput: "input",
      placeholder: "Expiration Date",
      type: "date",
      className: "input-style",
      value: specialMixDesignData.expirationDate,
      method: handleChangeData,
    },
    {
      name: "internalDesignType",
      typeofinput: "select",
      placeholder: "Internal Design Type",
      type: "text",
      className: "input-style",
      value: specialMixDesignData.internalDesignType,
      method: selectHandleChange,
    },

    {
      name: "mixDesignCode",
      typeofinput: "input",
      placeholder: "Mix Code",
      type: "text",
      className: "input-style",
      value: specialMixDesignData.mixDesignCode,
      method: handleChangeData,
    },

    {
      name: "stoneType",
      typeofinput: "select",
      placeholder: "Stone Type",
      type: "text",
      className: "input-style",
      value: specialMixDesignData.stoneType,
      method: selectHandleChange,
    },

    {
      name: "airType",
      typeofinput: "select",
      placeholder: "Air Type",
      type: "text",
      className: "input-style",
      value: specialMixDesignData.airType,
      method: selectHandleChange,
    },

    {
      name: "psi",
      typeofinput: "input",
      placeholder: "PSI",
      type: "text",
      className: "input-style",
      value: specialMixDesignData.psi,
      method: handleChangeData,
    },

    {
      name: "wcRatio",
      typeofinput: "input",
      placeholder: "W/C Ratio",
      type: "text",
      className: "input-style",
      value: specialMixDesignData.wcRatio,
      method: handleChangeData,
    },

    {
      name: "proportions",
      typeofinput: "input",
      placeholder: "Proportions",
      type: "text",
      className: "input-style",
      value: specialMixDesignData.proportions,
      method: handleChangeData,
    },

    {
      name: "avatar",
      typeofinput: "upload",
      placeholder: "Upload Document",
      type: "upload",
      className: "avatar-uploader",
      value: specialMixDesignData.documentPath,
      method: handleChange,
    },
  ];

  const addressFields = [
    {
      name: "address",
      typeofinput: "input",
      placeholder: "Address",
      type: "text",
      className: "input-style",
      value: addressData.address,
      method: handleChangeData,
    },

    {
      name: "cross_street",
      typeofinput: "input",
      placeholder: "Cross Street",
      type: "text",
      className: "input-style",
      value: addressData.cross_street,
      method: handleChangeData,
    },

    {
      name: "borough",
      typeofinput: "input",
      placeholder: "Borough",
      type: "text",
      className: "input-style",
      value: addressData.borough,
      method: handleChangeData,
    },

    {
      name: "state",
      typeofinput: "input",
      placeholder: "State",
      type: "text",
      className: "input-style",
      value: addressData.state,
      method: handleChangeData,
    },
    {
      name: "zipcode",
      typeofinput: "input",
      placeholder: "Zipcode",
      type: "text",
      className: "input-style",
      value: addressData.zipcode,
      method: handleChangeData,
    },

    {
      name: "isActive",
      typeofinput: "switch",
      placeholder: "isActive",
      type: "text",
      className: "input-style",
      value: addressData.isActive,
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

    if (pageName === "extra_charges") {
      generalFields = extraChargesFields;
    }

    if (pageName === "house_mix_design") {
      generalFields = mixDesignFields;
    }

    if (pageName === "special_mix_design") {
      generalFields = specialMixDesignFields;
    }

    if (pageName === "address") {
      generalFields = addressFields;
    }

    const UserModal = (
      <div>
        <Modal
          title={
            isEdit ? (
              <h2>Edit {pageName.replaceAll("_", " ")}</h2>
            ) : (
              <h2>Add new {pageName.replaceAll("_", " ")}</h2>
            )
          }
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
                  if (pageName === "houseMixDesign" || "specialMixDesign") {
                    return (
                      <Col span={24}>
                        <Upload
                          name={record.name}
                          listType="picture-card"
                          className={record.className}
                          showUploadList={false}
                          onChange={(file) => {
                            record.method(file, pageName);
                          }}
                        >
                          {mixDesignData.documentPath ? (
                            <img
                              src={mixDesignData.documentPath}
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
                  } else {
                    return (
                      <Col span={24}>
                        <Upload
                          name={record.name}
                          listType="picture-card"
                          className={record.className}
                          showUploadList={false}
                          onChange={(file) => {
                            record.method(file, pageName);
                          }}
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
                  }

                case "select":
                  if (pageName === "house_mix_design" || "specialMixDesign") {
                    return (
                      <Col span={12}>
                        <label>{"Select " + record.placeholder}</label>
                        <Select
                          style={{ width: "100%" }}
                          defaultValue={
                            !isEdit
                              ? "Select " + record.placeholder
                              : record.value
                          }
                          onChange={(value) => {
                            selectHandleChange(value, record.name);
                          }}
                        >
                          {(() => {
                            if (record.name === "internalDesignType") {
                              return Type.map((item) => {
                                return (
                                  <Option value={item.name}>{item.name}</Option>
                                );
                              });
                            } else if (record.name === "airType") {
                              return AirType.map((item) => {
                                return (
                                  <Option value={item.name}>{item.name}</Option>
                                );
                              });
                            } else if (record.name === "stoneType") {
                              return StoneType.map((item) => {
                                return (
                                  <Option value={item.name}>{item.name}</Option>
                                );
                              });
                            }
                          })()}
                        </Select>
                      </Col>
                    );
                  } else {
                    return (
                      <Col span={12}>
                        <label>{"Select Company"}</label>
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
                  }

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
                      <label>{record.placeholder}</label>
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
                      <label>{record.placeholder}</label>
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

          {isEdit ? (
            <span style={{ color: "red" }}>
              Note: Click on the Image to update the image
            </span>
          ) : null}
        </Modal>
      </div>
    );

    return UserModal;
  };

  const renderLeadModal = () => {
    const LeadModal = (
      <div>
        <Modal
          title={<h2>Lead section</h2>}
          visible={leadModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1920}
          destroyOnClose
        >
          <Tabs defaultActiveKey="1" onChange={onChange} size={"large"}>
            <TabPane
              tab={
                <span>
                  <CheckOutlined />
                  Lead Information
                </span>
              }
              key="1"
            >
              <Row gutter={6}>
                <Col span={12}>
                  <label>Lead</label>
                  <Input
                    placeholder={"Lead"}
                    name={"leadTitle"}
                    value={leadInformationData.leadTitle}
                    className={"input-style"}
                    onChange={handleChangeData}
                  />
                </Col>

                <Col span={12}>
                  <label>{"Select Address"}</label>
                  <Select
                    style={{ width: "100%" }}
                    defaultValue={
                      isEdit ? leadInformationData.address : "Select Address"
                    }
                    onChange={(value) => {
                      selectHandleChange(value, "select_address");
                    }}
                  >
                    {addresslist.map((item) => {
                      return (
                        <Option value={item.address}>{item.address}</Option>
                      );
                    })}
                  </Select>
                </Col>

                <Col span={12}>
                  <label>{"Select Status"}</label>
                  <Select
                    style={{ width: "100%" }}
                    defaultValue={
                      isEdit ? leadInformationData.status : "Select Status"
                    }
                    onChange={(value) => {
                      selectHandleChange(value, "select_status");
                    }}
                  >
                    {leadStatusData.map((item) => {
                      return <Option value={item.title}>{item.title}</Option>;
                    })}
                  </Select>
                </Col>

                <Col span={12}>
                  <label>Start Date</label>
                  <Input
                    placeholder={"Start Date"}
                    name={"startDate"}
                    value={leadInformationData.startDate}
                    type={"date"}
                    className={"input-style"}
                    onChange={handleChangeData}
                  />
                </Col>

                <Col span={12}>
                  <label>End Date</label>
                  <Input
                    placeholder={"End Date"}
                    name={"endDate"}
                    value={leadInformationData.endDate}
                    type={"date"}
                    className={"input-style"}
                    onChange={handleChangeData}
                  />
                </Col>

                <Col span={12}>
                  <label>Bid Due Date</label>
                  <Input
                    placeholder={"Bid Due Date"}
                    name={"BidDueDate"}
                    value={leadInformationData.BidDueDate}
                    type={"date"}
                    className={"input-style"}
                    onChange={handleChangeData}
                  />
                </Col>

                <Col span={12}>
                  <label>Estimated Yards</label>
                  <Input
                    placeholder={"Estimated Yards"}
                    name={"estimatedYards"}
                    value={leadInformationData.estimatedYards}
                    type={"number"}
                    className={"input-style"}
                    onChange={handleChangeData}
                  />
                </Col>

                <Col span={24}>
                  <label>Notes</label>
                  <TextArea
                    placeholder={"Notes"}
                    name={"notes"}
                    value={leadInformationData.notes}
                    type={"text"}
                    className={"input-style"}
                    onChange={handleChangeData}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <PlusOutlined />
                  Follow up
                </span>
              }
              key="2"
            >
              <div className="div-page-header">
                <Button onClick={showChildModal} className="button-add-user">
                  Add Follow up
                </Button>
              </div>

              <Table
                size="small"
                columns={followupTblHeaders}
                dataSource={childDataSource}
              />
              <Modal
                title={<h2>Follow up </h2>}
                visible={followupModalVisible}
                onOk={followUpHandleOk}
                onCancel={followuphandleCancel}
                width={800}
                destroyOnClose
              >
                <Row gutter={6}>
                  <Col span={12}>
                    <label>{"Lead"}</label>
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={
                        isEdit ? followupData.lead_id : "Select Lead"
                      }
                      onChange={(value) => {
                        selectHandleChange(value, "select_lead");
                      }}
                    >
                      {leads.map((item) => {
                        return (
                          <Option value={item.id}>{item.leadTitle}</Option>
                        );
                      })}
                    </Select>
                  </Col>
                  <Col span={12}>
                    <label>Contact Date</label>
                    <Input
                      placeholder={"Contact Date"}
                      name={"contactDate"}
                      type="date"
                      value={followupData.contactDate}
                      className={"input-style"}
                      onChange={followUpHandleChangeData}
                    />
                  </Col>
                  <Col span={12}>
                    <label>Contact Person Name</label>
                    <Input
                      placeholder={"Contact Person Name"}
                      name={"contactPersonName"}
                      value={followupData.contactPersonName}
                      className={"input-style"}
                      onChange={followUpHandleChangeData}
                    />
                  </Col>

                  <Col span={12}>
                    <label>{"Type of Contact"}</label>
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={
                        isEdit
                          ? followupData.typeOfContact
                          : "Select Type of Contact"
                      }
                      onChange={(value) => {
                        selectHandleChange(value, "select_type_of_contact");
                      }}
                    >
                      {typeOfContactData.map((item) => {
                        return <Option value={item.title}>{item.title}</Option>;
                      })}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <label>Email</label>
                    <Input
                      placeholder={"Email"}
                      name={"email"}
                      value={followupData.email}
                      type={"text"}
                      className={"input-style"}
                      onChange={followUpHandleChangeData}
                    />
                  </Col>

                  <Col span={12}>
                    <label>On Site Visit</label>
                    <Input
                      placeholder={"On Site Visit"}
                      name={"onSiteVisit"}
                      value={followupData.onSiteVisit}
                      type={"text"}
                      className={"input-style"}
                      onChange={followUpHandleChangeData}
                    />
                  </Col>

                  <Col span={12}>
                    <label>Contact No</label>
                    <Input
                      placeholder={"Contact No"}
                      name={"contactNo"}
                      value={followupData.contactNo}
                      type={"text"}
                      className={"input-style"}
                      onChange={followUpHandleChangeData}
                    />
                  </Col>

                  <Col span={12}>
                    <label>Next Follow Up Date</label>
                    <Input
                      placeholder={"Next Follow Up Date"}
                      name={"nextMeetingDate"}
                      value={followupData.nextMeetingDate}
                      type={"date"}
                      className={"input-style"}
                      onChange={followUpHandleChangeData}
                    />
                  </Col>

                  <Col span={24}>
                    <label>Description</label>
                    <TextArea
                      placeholder={"Description"}
                      name={"description"}
                      value={followupData.description}
                      type={"text"}
                      className={"input-style"}
                      onChange={followUpHandleChangeData}
                    />
                  </Col>
                </Row>
              </Modal>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <CheckOutlined />
                  Audit Logs
                </span>
              }
              key="3"
            >
              <Table
                size="small"
                columns={auditLogsTblHeaders}
                dataSource={auditLogs}
              />
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );

    return LeadModal;
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

      case "extra_charges":
        setLoading(true);
        handler
          .dataPost("/extra-charges/deleteExtraCharge", updatebleData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getExtraChargeAPICall();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- deleteExtraCharge", error);
          });
        break;

      case "house_mix_design":
        setLoading(true);
        handler
          .dataPost("/mix-design/deleteMixDesign", updatebleData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getMixDesigns("house_mix_Design");
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- deleteMixDesign", error);
          });
        break;

      case "special_mix_design":
        setLoading(true);
        handler
          .dataPost("/mix-design/deleteMixDesign", updatebleData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getMixDesigns("special_mix_Design");
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- deleteMixDesign", error);
          });
        break;

      case "address":
        setLoading(true);
        handler
          .dataPost("/lead-section/deleteAddress", updatebleData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getAddresses();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- deleteMixDesign", error);
          });
        break;

      case "lead":
        setLoading(true);
        handler
          .dataPost("/lead-information/deleteLeadInfo", updatebleData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getLeads();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- deleteLeadInfo", error);
          });
        break;

      case "followup":
        setLoading(true);
        handler
          .dataPost("/follow-up-section/deleteFollowup", updatebleData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getLeads();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- deleteFollowup", error);
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

      case "extra_charges":
        setLoading(true);

        let updatableDataforEc = {
          ...extraChargesData,
          id: id,
        };

        handler
          .dataPost("/extra-charges/updateExtraCharge", updatableDataforEc, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getExtraChargeAPICall();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updateExtraCharge", error);
          });
        break;

      case "house_mix_design":
        setLoading(true);

        let updatableDataforhmd = {
          ...mixDesignData,
          id: id,
        };

        handler
          .dataPost("/mix-design/updateMixDesign", updatableDataforhmd, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getMixDesigns("house_mix_design");
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updateMixDesign", error);
          });
        break;

      case "special_mix_design":
        setLoading(true);

        let updatableDataforsmd = {
          ...mixDesignData,
          id: id,
        };

        handler
          .dataPost("/mix-design/updateMixDesign", updatableDataforsmd, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getMixDesigns("special_mix_design");
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updateMixDesign", error);
          });
        break;
      case "address":
        setLoading(true);

        let updatableDataforaddress = {
          ...addressData,
          id: id,
        };

        handler
          .dataPost("/lead-section/updateAddress", updatableDataforaddress, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getAddresses();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updateAddress", error);
          });
        break;

      case "lead":
        setLoading(true);

        let updatableDataforlead = {
          ...leadInformationData,
          id: id,
        };

        handler
          .dataPost(
            "/lead-information/updateLeadInfo",
            updatableDataforlead,
            {}
          )
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getLeads();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updateLeadInfo", error);
          });
        break;

      case "followup":
        setLoading(true);

        let updatableDataforfollowup = {
          ...followupData,
          id: id,
        };

        handler
          .dataPost(
            "/follow-up-section/updatefollowup",
            updatableDataforfollowup,
            {}
          )
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              getFollowups("lead");
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updatefollowup", error);
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

      case "extra_charges":
        setLoading(true);

        handler
          .dataPost("/extra-charges/addExtraCharge", extraChargesData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 201) {
              message.success(response.data.message);
              getExtraChargeAPICall();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- addExtraCharge", error);
          });
        break;

      case "house_mix_design":
        setLoading(true);

        let data = {
          ...mixDesignData,
          mixType: "house_mix_design",
        };

        handler
          .dataPost("/mix-design/addMixDesign", data, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 201) {
              message.success(response.data.message);
              getMixDesigns(data.mixType);
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- addMixDesign", error);
          });
        break;
      case "special_mix_design":
        setLoading(true);

        let datasmd = {
          ...specialMixDesignData,
          mixType: "special_mix_design",
        };

        handler
          .dataPost("/mix-design/addMixDesign", datasmd, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 201) {
              message.success(response.data.message);
              getMixDesigns(datasmd.mixType);
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- addMixDesign", error);
          });
        break;

      case "address":
        setLoading(true);

        let addressdata_ = {
          ...addressData,
        };

        handler
          .dataPost("/lead-section/addAddress", addressdata_, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 201) {
              message.success(response.data.message);
              getAddresses();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- addMixDesign", error);
          });
        break;

      case "lead":
        setLoading(true);

        let leaddata = {
          ...leadInformationData,
        };

        handler
          .dataPost("/lead-information/addLeadInfo", leaddata, {
            authorization: localStorage.getItem("token"),
          })
          .then((response) => {
            setLoading(false);
            if (response.status == 201) {
              resetLeadInfoStates();
              message.success(response.data.message);
              getLeads();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- addLeadInfo", error);
          });
        break;

      case "followup":
        setLoading(true);

        let followupdata = {
          ...followupData,
          section_name: "lead",
        };

        handler
          .dataPost("/follow-up-section/addFollowUp", followupdata, {
            authorization: localStorage.getItem("token"),
          })
          .then((response) => {
            setLoading(false);
            if (response.status == 201) {
              message.success(response.data.message);
              setFollowupModalVisible(false);
              getFollowups("lead");
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- addFollowUp", error);
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

  // get addresses api call
  const getAddresses = (pageName) => {
    setLoading(true);
    handler
      .dataGet("/lead-section/getAdresses", {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          if (pageName === "lead") {
            setaddressList(response.data.data);
          } else {
            setDataSource(response.data.data);
          }
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

  // get addresses api call
  const getLeads = () => {
    setLoading(true);
    handler
      .dataGet("/lead-information/getLeadInfo", {
        authorization: localStorage.getItem("token"),
      })
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setDataSource(response.data.data);
          setLeads(response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getLeadInfo", error);
      });
  };

  // get audit logs api call
  const getAuditLogs = (section_name) => {
    setLoading(true);
    handler
      .dataGet("/audit-logs/getAuditLogs/?sectionName=" + section_name, {
        authorization: localStorage.getItem("token"),
      })
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setAuditLogs(response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getLeadInfo", error);
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

  // get extra charge list api call
  const getExtraChargeAPICall = () => {
    setLoading(true);
    handler
      .dataGet("/extra-charges/getExtraCharges", {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setDataSource(response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getExtraChargeAPICall", error);
      });
  };

  // get mix design list api call
  const getMixDesigns = (type) => {
    setLoading(true);

    handler
      .dataGet("/mix-design/getMixDesigns?mixType=" + type, {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setDataSource(response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getMixDesigns", error);
      });
  };

  // get follow-up list api call
  const getFollowups = (section_name) => {
    setLoading(true);

    handler
      .dataGet(
        "/follow-up-section/getFollowups?section_name=" + section_name,
        {}
      )
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setChildDataSource(response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getFollowups", error);
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

      case "extra_charges":
        getConstructionCompanyForProjectManager();
        getExtraChargeAPICall();
        break;

      case "house_mix_design":
        getConstructionCompanyForProjectManager();
        getMixDesigns("house_mix_design");
        break;

      case "special_mix_design":
        getConstructionCompanyForProjectManager();
        getMixDesigns("special_mix_design");
        break;

      case "address":
        getAddresses();
        break;

      case "lead":
        getLeads();
        getAddresses("lead");
        break;

      case "auditlogs":
        getAuditLogs("lead");
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
  const uploadAPICall = (file, destination) => {
    const formData = new FormData();

    if (destination === "user") {
      formData.append("destination", "profile");
    }

    if (destination === "logo") {
      formData.append("destination", "logo");
    }

    if (destination === "houseMixDesign") {
      formData.append("destination", "houseMixDesign");
    }

    if (destination === "specialMixDesign") {
      formData.append("destination", "specialMixDesign");
    }

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
          setDocumentId(response.data.imageRef);
          setMixDesignData({
            ...mixDesignData,
            documentPath: response.data.imageRef,
          });
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
    ecTblHeaders,
    mdTblHeaders,
    smdTblHeaders,
    addressTblHeaders,
    leadInfoTblHeaders,
    renderLeadModal,
  };

  return StatesContainer;
}

export default ContentPageLogic;
