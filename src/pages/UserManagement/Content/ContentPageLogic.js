import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

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
  CheckCircleOutlined,
  UploadOutlined,
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
  const [opportunities, setOpportunities] = useState([]);
  const [mixDesign, setMixDesign] = useState([]);
  const [cc, setCC] = useState([]);
  const [projectManager, setProjectManager] = useState([]);
  const [projectManagerEmail, setProjectManagerEmail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [leadModalVisible, setLeadModalVisible] = useState(false);
  const [followupModalVisible, setFollowupModalVisible] = useState(false);
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [constructionCompanyModalVisible, setConstructionCompanyModalVisible] =
    useState(false);
  const [isAddCCModalVisible, setIsAddCCModalVisible] = useState(false);
  const [isOpportunityModalVisible, setOpportunityModalVisible] =
    useState(false);
  const [isQualityControlModalVisible, setQualityControlModalVisible] =
    useState(false);
  const [isQuotationModalVisible, setQuotationModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [documentId, setDocumentId] = useState("");
  const { Type, AirType, StoneType } = Constant();
  const [childDataSource, setChildDataSource] = useState([]);
  const [changeLog, setChangeLog] = useState([]);
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

  const [leadInformationExistingData, setLeadInformationExistingData] =
    useState({
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

  const [qualityControlData, setQualityControlData] = useState({
    section_id: "",
    loadingPlant: "",
    mixDesignName: "",
    mixDesignId: "",
    minPrice: "",
    approvedDesign: "",
    tr3: "",
    tr2: "",
    price: "",
    estimatedYards: "",
    section_name: "",
  });

  const [qualityControlExistingData, setQualityControlExistingData] = useState({
    section_id: "",
    loadingPlant: "",
    mixDesignName: "",
    mixDesignId: "",
    minPrice: "",
    approvedDesign: "",
    tr3: "",
    tr2: "",
    price: "",
    estimatedYards: "",
    section_name: "",
  });

  const [followupExistingData, setFollowupExistingData] = useState({
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

  const [plant, setPlant] = useState([]);

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

  const [opportunityData, setOpportunityData] = useState({
    lead_name: "",
    address_id: "",
    estimated_yard: "",
    plant_id: "",
    construction_company: "",
    project_manager: "",
    startDate: "",
    endDate: "",
    bidDueDate: "",
    status: "",
    notes: "",
  });

  const [opportunityExistingData, setOpportunityExistingData] = useState({
    lead_name: "",
    address_id: "",
    estimated_yard: "",
    plant_id: "",
    construction_company: "",
    project_manager: "",
    startDate: "",
    endDate: "",
    bidDueDate: "",
    status: "",
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
                isActive: record.isActive,
              });

              setLeadInformationExistingData({
                leadTitle: record.leadTitle,
                address: record.address,
                status: record.status,
                startDate: record.startDate,
                endDate: record.endDate,
                BidDueDate: record.BidDueDate,
                estimatedYards: record.estimatedYards,
                notes: record.notes,
                isActive: record.isActive,
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

  const opportunityInfoTblHeaders = [
    {
      title: "Opportunity",
      dataIndex: "lead_name",
      key: "lead_name",
    },
    {
      title: "Address",
      dataIndex: "address_id",
      key: "address_id",
    },
    {
      title: "Construction Company",
      dataIndex: "construction_company",
      key: "construction_company",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={(e) => {
              e.preventDefault();
              getProjectManagerAPICall("opportunity");
              getPlants();
              setOpportunityModalVisible(true);
              setIsEdit(true);
              setId(record.id);
              setQualityControlData({
                ...qualityControlData,
                section_id: record.id,
              });

              setProjectManagerEmail(record.project_manager_email);

              setOpportunityData({
                lead_name: record.lead_name,
                address_id: record.address_id,
                estimated_yard: record.estimated_yard,
                plant_id: record.plant_id,
                construction_company: record.construction_company,
                project_manager: record.project_manager,
                startDate: record.startDate,
                endDate: record.endDate,
                bidDueDate: record.bidDueDate,
                status: record.status,
                notes: record.notes,
              });

              setOpportunityExistingData({
                lead_name: record.lead_name,
                address_id: record.address_id,
                estimated_yard: record.estimated_yard,
                plant_id: record.plant_id,
                construction_company: record.construction_company,
                project_manager: record.project_manager,
                startDate: record.startDate,
                endDate: record.endDate,
                bidDueDate: record.bidDueDate,
                status: record.status,
              });
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteAPICalls("opportunity", record.id)}
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
      dataIndex: "lead_id",
      key: "lead_id",
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

              setFollowupExistingData({
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
            onConfirm={() => {
              if (pageName === "opportunity") {
                deleteAPICalls("followup", record.id, "opportunity");
              } else if (pageName === "lead") {
                deleteAPICalls("followup", record.id, "lead");
              }
            }}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const qcTblHeaders = [
    {
      title: "Loading Plant",
      dataIndex: "loadingPlant",
      key: "loadingPlant",
    },
    {
      title: "Mix Design",
      dataIndex: "mixDesignName",
      key: "mixDesignName",
    },
    {
      title: "Submitted Mix",
      key: "subMittedDesign",
      render: (_, record) => (
        <Space size="middle">
          <Button>
            <a href={record.subMittedDesign} target="_blank" rel="noreferrer">
              View
            </a>
          </Button>
        </Space>
      ),
    },
    {
      title: "Approved Mix",
      key: "approvedDesign",
      render: (_, record) => (
        <Space size="middle">
          <Button>
            <a href={record.approvedDesign} target="_blank" rel="noreferrer">
              View
            </a>
          </Button>
        </Space>
      ),
    },

    {
      title: "TR3",
      key: "tr3",
      render: (_, record) => (
        <Space size="middle">
          <Button>
            <a href={record.tr3} target="_blank" rel="noreferrer">
              View
            </a>
          </Button>
        </Space>
      ),
    },

    {
      title: "TR2",
      key: "tr2",
      render: (_, record) => (
        <Space size="middle">
          <Button>
            <a href={record.tr2} target="_blank" rel="noreferrer">
              View
            </a>
          </Button>
        </Space>
      ),
    },

    {
      title: "Date",
      dataIndex: "createdOn",
      key: "createdOn",
    },

    {
      title: "Quote Type",
      dataIndex: "section_name",
      key: "section_name",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={(e) => {
              e.preventDefault();
              const list = [
                {
                  filename: "submittedDesign.pdf",
                  path: record.subMittedDesign,
                },
                {
                  filename: "approvedDesign.pdf",
                  path: record.approvedDesign,
                },
                {
                  filename: "tr3.pdf",
                  path: record.tr3,
                },
                {
                  filename: "tr2.pdf",
                  path: record.tr2,
                },
              ];

              sendMailtoManager(projectManagerEmail, "PFA", list);
            }}
          >
            Mail
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setQualityControlModalVisible(true);
              setIsEdit(true);
              setId(record.id);

              setQualityControlData({
                section_id: record.section_id,
                loadingPlant: record.loadingPlant,
                mixDesignName: record.mixDesignName,
                mixDesignId: record.mixDesignId,
                minPrice: record.minPrice,
                approvedDesign: record.approvedDesign,
                tr3: record.tr3,
                tr2: record.tr2,
                price: record.price,
                estimatedYards: record.estimatedYards,
                section_name: record.section_name,
              });

              setQualityControlExistingData({
                section_id: record.section_id,
                loadingPlant: record.loadingPlant,
                mixDesignName: record.mixDesignName,
                mixDesignId: record.mixDesignId,
                minPrice: record.minPrice,
                approvedDesign: record.approvedDesign,
                tr3: record.tr3,
                tr2: record.tr2,
                price: record.price,
                estimatedYards: record.estimatedYards,
                section_name: record.section_name,
              });
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              if (pageName === "opportunity") {
                deleteAPICalls("qualitycontrol", record.id, "qualitycontrol");
              }
            }}
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
              setLogModalVisible(true);
              setChangeLog(JSON.parse(record.updatedField));
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

  const onOpTabChange = (key) => {
    if (key == 1) {
      getProjectManagerAPICall("opportunity");
      getPlants();
    } else if (key == 2) {
      getFollowups("opportunity");
    } else if (key == 3) {
      getAuditLogs("opportunity");
    } else if (key == 4) {
      getMixDesigns("house_mix_design", "qualitycontrol-opportunity");
      getQualityControls("qualitycontrol-opportunity");
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

    if (pageName === "opportunity") {
      console.log("opp");
      setOpportunityData({
        ...opportunityData,
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
        mixDesignName:
          mixDesignData.psi +
          " " +
          mixDesignData.internalDesignType +
          " " +
          mixDesignData.proportions +
          " " +
          mixDesignData.airType +
          " " +
          mixDesignData.stoneType +
          " WC" +
          " " +
          mixDesignData.wcRatio,
        [evt.target.name]: value,
      });
    }

    if (pageName === "special_mix_design") {
      setSpecialMixDesignData({
        ...specialMixDesignData,
        mixDesignName:
          specialMixDesignData.psi +
          " " +
          specialMixDesignData.internalDesignType +
          " " +
          specialMixDesignData.proportions +
          " " +
          specialMixDesignData.airType +
          " " +
          specialMixDesignData.stoneType +
          " WC" +
          " " +
          specialMixDesignData.wcRatio,
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

  const handleCCChangeData = (evt) => {
    const value = evt.target.value;
    setCCdata({
      ...ccData,
      [evt.target.name]: value,
    });
  };

  // form handler child
  const followUpHandleChangeData = (evt) => {
    const value = evt.target.value;
    setFollowupData({
      ...followupData,
      [evt.target.name]: value,
    });
  };

  const qualityControlHandleChangeData = (evt) => {
    const value = evt.target.value;
    setQualityControlData({
      ...qualityControlData,
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

    if (pageName === "opportunity") {
      switch (name) {
        case "select_status":
          setOpportunityData({
            ...opportunityData,
            status: value,
          });
          break;

        case "select_lead":
          // alert(value + "<----oppp");
          setFollowupData({
            ...followupData,
            lead_id: value,
          });
          break;

        case "select_project_manager":
          setOpportunityData({
            ...opportunityData,
            project_manager: value,
          });

          break;

        case "select_type_of_contact":
          setFollowupData({
            ...followupData,
            typeOfContact: value,
          });
          break;

        case "select_plant":
          setOpportunityData({
            ...opportunityData,
            plant_id: value,
          });
          break;

        case "select_loading_plant":
          setQualityControlData({
            ...qualityControlData,
            loadingPlant: value,
          });
          break;

        case "select_mix_design":
          getMixDesignById(value);
          break;
        default:
          break;
      }
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
          // alert(value);
          setFollowupData({
            ...followupData,
            lead_id: value,
          });

        case "select_company":
          //TODO
          setCompanyId(value);
          break;

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

  const constructionCompanyShowModal = () => {
    setConstructionCompanyModalVisible(true);
  };

  // method for showing child modal
  const showChildModal = () => {
    setIsEdit(false);
    setFollowupModalVisible(true);
  };

  const showLogModal = () => {
    setLogModalVisible(true);
  };

  const handleOpportunityOk = () => {
    setOpportunityModalVisible(false);
    updateAPICalls("opportunity");
  };
  // method to be called when modal ok is clicked
  const handleOk = (modalName) => {
    setIsModalVisible(false);
    setLeadModalVisible(false);

    if (modalName === "construction_company") {
      if (companyId != "") {
        setConstructionCompanyModalVisible(false);

        addAPICalls("opportunity");

        console.log(leadInformationData);
      } else {
        message.error(
          "To create an opportunity, Please select atleast one construction company"
        );
      }
    } else {
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
    }
  };

  const handleAddCCOk = () => {
    setIsAddCCModalVisible(false);
    addAPICalls("add_construction_company");
  };

  const handleAddCCCancel = () => {
    setIsAddCCModalVisible(false);
  };

  // followup handleok
  const followUpHandleOk = (module) => {
    setFollowupModalVisible(false);
    switch (module) {
      case "followup":
        if (!isEdit) {
          addAPICalls("followup");
        } else {
          updateAPICalls("followup");
        }
        break;

      case "followup-opportunity":
        if (!isEdit) {
          addAPICalls("followup-opportunity");
        } else {
          updateAPICalls("followup-opportunity");
        }
        break;

      default:
        break;
    }
  };

  const QualityControlHandleOk = (module) => {
    setQualityControlModalVisible(false);
    switch (module) {
      case "qualitycontrol-opportunity":
        if (!isEdit) {
          addAPICalls("qualitycontrol-opportunity");
        } else {
          updateAPICalls("qualitycontrol-opportunity");
        }
        break;

      default:
        break;
    }
  };

  const sendMailtoManager = (toMail, body, attchment) => {
    setLoading(true);

    handler
      .dataPost(
        "/mail/sendMail",
        {
          toMail: toMail,
          body: body,
          attachment: attchment,
        },
        {}
      )
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          message.success(response.data.message);
          addLogs("Email Sent", "opportunity", id, null);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- addLogs", error);
      });
  };

  const logModalHandleOk = () => {
    setLogModalVisible(false);
  };

  // followup handleCancel
  const followuphandleCancel = () => {
    setFollowupModalVisible(false);
  };

  const loghandleCancel = () => {
    setLogModalVisible(false);
  };

  // method to be called when modal cancel is clicked
  const handleCancel = () => {
    setIsModalVisible(false);
    setLeadModalVisible(false);
    setConstructionCompanyModalVisible(false);
    setOpportunityModalVisible(false);
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
  const handleChange = (info, pageName, feature) => {
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

        case "opportunity":
          switch (feature) {
            case "approvedDesign":
              uploadAPICall(
                info.file.originFileObj,
                "houseMixDesign",
                "approvedDesign"
              );
              break;

            case "tr3":
              uploadAPICall(info.file.originFileObj, "houseMixDesign", "tr3");
              break;

            case "tr2":
              uploadAPICall(info.file.originFileObj, "houseMixDesign", "tr2");
              break;

            default:
              break;
          }

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
                  if (record.name == "mixDesignName") {
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
                          disabled
                        />
                      </Col>
                    );
                  } else {
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
                  }

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
          footer={[
            isEdit ? (
              <Button
                style={{ backgroundColor: "green", color: "white" }}
                onClick={constructionCompanyShowModal}
              >
                Create Opportunity
              </Button>
            ) : null,
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Add Lead
            </Button>,
          ]}
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
                onOk={() => {
                  followUpHandleOk("followup");
                }}
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
                          <Option value={item.leadTitle}>
                            {item.leadTitle}
                          </Option>
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

              <Modal
                title={<h2>Changed log Information </h2>}
                visible={logModalVisible}
                onOk={logModalHandleOk}
                onCancel={loghandleCancel}
                destroyOnClose
              >
                <table>
                  {changeLog.map((row) => {
                    return (
                      <tr className="tr-custom">
                        <td
                          className="td-custom"
                          style={{ fontWeight: "bold" }}
                        >
                          {row.key}
                        </td>
                        <td className="td-custom">{row.value}</td>
                      </tr>
                    );
                  })}
                </table>
              </Modal>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );

    return LeadModal;
  };

  const renderOpportunityModal = () => {
    const OpportunityModal = (
      <div>
        <Modal
          title={<h2>Opportunity section</h2>}
          visible={isOpportunityModalVisible}
          onOk={handleOpportunityOk}
          onCancel={handleCancel}
          width={1920}
          destroyOnClose
          footer={[
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={() => {
                setQuotationModalVisible(true);
              }}
            >
              Create Quotation
            </Button>,
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOpportunityOk}>
              Update Opportunity
            </Button>,
          ]}
        >
          <Tabs defaultActiveKey="1" onChange={onOpTabChange} size={"large"}>
            <TabPane
              tab={
                <span>
                  <CheckOutlined />
                  Opportunity Information
                </span>
              }
              key="1"
            >
              <Row gutter={6}>
                <Col span={12}>
                  <label>Job</label>
                  <Input
                    placeholder={"Job"}
                    name={"lead_name"}
                    value={opportunityData.lead_name}
                    className={"input-style"}
                    onChange={handleChangeData}
                    disabled
                  />
                </Col>

                <Col span={12}>
                  <label>{"Address"}</label>
                  <Select
                    disabled
                    style={{ width: "100%" }}
                    defaultValue={
                      isEdit ? opportunityData.address_id : "Select Address"
                    }
                  ></Select>
                </Col>

                <Col span={12}>
                  <label>{"Construction Company"}</label>
                  <Select
                    disabled
                    style={{ width: "100%" }}
                    defaultValue={
                      isEdit
                        ? opportunityData.construction_company
                        : "Select Construction Company"
                    }
                  ></Select>
                </Col>

                <Col span={12}>
                  <label>{"Manager Name"}</label>
                  <Select
                    style={{ width: "100%" }}
                    defaultValue={
                      isEdit
                        ? opportunityData.project_manager
                        : "Select Project Manager"
                    }
                    onChange={(value) => {
                      selectHandleChange(value, "select_project_manager");
                    }}
                  >
                    {projectManager.map((item) => {
                      return (
                        <Option
                          value={item.project_manager_name + "_" + item.id}
                        >
                          {item.project_manager_name}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>

                <Col span={12}>
                  <label>Estimated Yards</label>
                  <Input
                    placeholder={"Estimated Yards"}
                    name={"estimated_yard"}
                    value={opportunityData.estimated_yard}
                    type={"number"}
                    className={"input-style"}
                    onChange={handleChangeData}
                  />
                </Col>

                <Col span={12}>
                  <label>{"Select Status"}</label>
                  <Select
                    style={{ width: "100%" }}
                    defaultValue={
                      isEdit ? opportunityData.status : "Select Status"
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
                    value={opportunityData.startDate}
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
                    value={opportunityData.endDate}
                    type={"date"}
                    className={"input-style"}
                    onChange={handleChangeData}
                  />
                </Col>

                <Col span={12}>
                  <label>Bid Due Date</label>
                  <Input
                    placeholder={"Bid Due Date"}
                    name={"bidDueDate"}
                    value={opportunityData.bidDueDate}
                    type={"date"}
                    className={"input-style"}
                    onChange={handleChangeData}
                  />
                </Col>

                <Col span={12}>
                  <label>{"Concrete Plant"}</label>
                  <Select
                    style={{ width: "100%" }}
                    defaultValue={
                      isEdit ? opportunityData.plant_id : "Select Plant"
                    }
                    onChange={(value) => {
                      selectHandleChange(value, "select_plant");
                    }}
                  >
                    {plant.map((item) => {
                      return (
                        <Option value={item.plant_name}>
                          {item.plant_name}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>

                <Col span={24}>
                  <label>Notes</label>
                  <TextArea
                    placeholder={"Notes"}
                    name={"notes"}
                    value={opportunityData.notes}
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
                <Button
                  onClick={() => {
                    setIsEdit(false);
                    showChildModal();
                  }}
                  className="button-add-user"
                >
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
                onOk={() => {
                  followUpHandleOk("followup-opportunity");
                }}
                onCancel={followuphandleCancel}
                width={800}
                destroyOnClose
              >
                <Row gutter={6}>
                  <Col span={12}>
                    <label>{"Opportunity"}</label>
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={
                        isEdit ? followupData.lead_id : "Select Lead"
                      }
                      onChange={(value) => {
                        selectHandleChange(value, "select_lead");
                      }}
                    >
                      {opportunities.map((item) => {
                        return (
                          <Option value={item.lead_name}>
                            {item.lead_name}
                          </Option>
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

              <Modal
                title={<h2>Changed log Information </h2>}
                visible={logModalVisible}
                onOk={logModalHandleOk}
                onCancel={loghandleCancel}
                destroyOnClose
              >
                <table>
                  {changeLog.map((row) => {
                    return (
                      <tr className="tr-custom">
                        <td
                          className="td-custom"
                          style={{ fontWeight: "bold" }}
                        >
                          {row.key}
                        </td>
                        <td className="td-custom">{row.value}</td>
                      </tr>
                    );
                  })}
                </table>
              </Modal>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <CheckCircleOutlined />
                  Quality Control
                </span>
              }
              key="4"
            >
              <div className="div-page-header">
                <Button
                  onClick={() => {
                    setIsEdit(false);
                    setQualityControlModalVisible(true);
                  }}
                  className="button-add-user"
                >
                  Add Quality Control
                </Button>
              </div>

              <Table
                size="small"
                columns={qcTblHeaders}
                dataSource={childDataSource}
              />
              <Modal
                title={!isEdit ? <h2>Add Files</h2> : <h2>Edit Files</h2>}
                visible={isQualityControlModalVisible}
                onOk={() => {
                  QualityControlHandleOk("qualitycontrol-opportunity");
                }}
                onCancel={() => {
                  setQualityControlModalVisible(false);
                }}
                width={800}
                destroyOnClose
              >
                <Row gutter={6}>
                  <Col span={12}>
                    <label>{"Loading Plant"}</label>
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={
                        isEdit
                          ? qualityControlData.loadingPlant
                          : "Select Loading Plant"
                      }
                      onChange={(value) => {
                        selectHandleChange(value, "select_loading_plant");
                      }}
                    >
                      {plant.map((item) => {
                        return (
                          <Option value={item.plant_name}>
                            {item.plant_name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Col>
                  <Col span={12}>
                    <label>{"Mix Design Name"}</label>
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={
                        isEdit
                          ? qualityControlData.mixDesignName
                          : "Select Mix Design"
                      }
                      onChange={(value) => {
                        selectHandleChange(value, "select_mix_design");
                      }}
                    >
                      {mixDesign.map((item) => {
                        return (
                          <Option value={item.id}>{item.mixDesignName}</Option>
                        );
                      })}
                    </Select>
                  </Col>
                  <Col span={12}>
                    <label>Minimum Price ($)</label>
                    <Input
                      name={"minPrice"}
                      value={qualityControlData.minPrice}
                      className={"input-style"}
                      onChange={qualityControlHandleChangeData}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <label>Approved Design</label>
                    <br />
                    <Upload
                      name={"approvedDesign"}
                      showUploadList={true}
                      onChange={(file) => {
                        handleChange(file, "opportunity", "approvedDesign");
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Col>

                  <Col span={12}>
                    <label>TR3</label>
                    <br />
                    <Upload
                      name={"tr3"}
                      showUploadList={true}
                      onChange={(file) => {
                        handleChange(file, "opportunity", "tr3");
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Col>

                  <Col span={12}>
                    <label>TR2</label>
                    <br />
                    <Upload
                      name={"tr2"}
                      showUploadList={true}
                      onChange={(file) => {
                        handleChange(file, "opportunity", "tr2");
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Col>

                  <Col span={12}>
                    <label>Price</label>
                    <Input
                      placeholder={"Price"}
                      name={"price"}
                      value={qualityControlData.price}
                      type={"text"}
                      className={"input-style"}
                      onChange={qualityControlHandleChangeData}
                    />
                  </Col>

                  <Col span={12}>
                    <label>Est. Yards</label>
                    <Input
                      placeholder={"Est. Yards"}
                      name={"estimatedYards"}
                      value={qualityControlData.estimatedYards}
                      type={"text"}
                      className={"input-style"}
                      onChange={qualityControlHandleChangeData}
                    />
                  </Col>
                </Row>
              </Modal>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );

    return OpportunityModal;
  };

  const renderConstructionCompanyModal = () => {
    const ccModal = (
      <div>
        <Modal
          title={<h2>Select Construction Company</h2>}
          visible={constructionCompanyModalVisible}
          onOk={() => handleOk("construction_company")}
          onCancel={handleCancel}
          okText={"Create Opportunity"}
          destroyOnClose
        >
          <Row>
            <label>Construction Company : &nbsp;</label>
            <Col span={12}>
              <Select
                style={{ width: "100%" }}
                defaultValue={"Select Company"}
                onChange={(value) => {
                  selectHandleChange(value, "select_company");
                }}
              >
                {cc.map((item) => {
                  return (
                    <Option value={item.id}>
                      {item.construction_company_name}
                    </Option>
                  );
                })}
              </Select>
              <div>
                <label style={{ color: "red", fontSize: 11 }}>
                  Please select atleast 1 construction company
                </label>
                <Col span={24} style={{ width: "100%", fontSize: 11 }}>
                  <label
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={(e) => {
                      setIsAddCCModalVisible(true);
                    }}
                  >
                    Add construction company
                  </label>
                </Col>
              </div>
            </Col>
          </Row>
        </Modal>
      </div>
    );

    return ccModal;
  };

  const renderAddCCModal = () => {
    const UserModal = (
      <div>
        <Modal
          title={<h2>Add new construction company</h2>}
          visible={isAddCCModalVisible}
          onOk={handleAddCCOk}
          onCancel={handleAddCCCancel}
          destroyOnClose
        >
          <Row gutter={6}>
            {ccFields.map((record) => {
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
                        onChange={handleCCChangeData}
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
                        onChange={handleCCChangeData}
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

  const renderQuotationModal = () => {
    const qModal = (
      <div>
        <Modal
          title={<h2>Add Quotation</h2>}
          visible={isQuotationModalVisible}
          onOk={""}
          onCancel={() => setQuotationModalVisible(false)}
          destroyOnClose
        >
          <Row gutter={6}></Row>
        </Modal>
      </div>
    );

    return qModal;
  };

  // delete API calls
  const deleteAPICalls = (pageName, id, modalName) => {
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
              getMixDesigns("house_mix_design");
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
              //TODO
              if (modalName === "opportunity") {
                addLogs("Follow-up deleted", "opportunity", id, null);
                getFollowups("opportunity");
              }

              if (modalName === "lead") {
                addLogs("Follow-up deleted", "lead", id, null);
                getFollowups("lead");
              }
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- deleteFollowup", error);
          });
        break;

      case "qualitycontrol":
        setLoading(true);
        handler
          .dataPost("/quality-control/deleteQualityControl", updatebleData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              //TODO
              if (modalName === "qualitycontrol") {
                addLogs("Quality control deleted", "opportunity", id, null);
                getQualityControls("opportunity");
              }
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

              const logData = [];

              if (
                leadInformationData.leadTitle !==
                leadInformationExistingData.leadTitle
              ) {
                logData.push({
                  key: "Lead Title",
                  value: leadInformationData.leadTitle,
                });
              }

              if (
                leadInformationData.address !==
                leadInformationExistingData.address
              ) {
                logData.push({
                  key: "Address",
                  value: leadInformationData.address,
                });
              }

              if (
                leadInformationData.startDate !==
                leadInformationExistingData.startDate
              ) {
                logData.push({
                  key: "Start Date",
                  value: leadInformationData.startDate,
                });
              }

              if (
                leadInformationData.endDate !==
                leadInformationExistingData.endDate
              ) {
                logData.push({
                  key: "End Date",
                  value: leadInformationData.endDate,
                });
              }

              if (
                leadInformationData.BidDueDate !==
                leadInformationExistingData.BidDueDate
              ) {
                logData.push({
                  key: "Bid Due Date",
                  value: leadInformationData.BidDueDate,
                });
              }

              if (
                leadInformationData.estimatedYards !==
                leadInformationExistingData.estimatedYards
              ) {
                logData.push({
                  key: "Estimated Yards",
                  value: leadInformationData.estimatedYards,
                });
              }

              if (
                leadInformationData.notes !== leadInformationExistingData.notes
              ) {
                logData.push({
                  key: "Notes",
                  value: leadInformationData.notes,
                });
              }

              if (logData.length != 0) {
                addLogs("Lead updated", "lead", id, logData);
              } else {
                message.info("No field is updated");
              }
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updateLeadInfo", error);
          });
        break;

      case "opportunity":
        setLoading(true);

        let updatableDataforOpportunity = {
          ...opportunityData,
          id: id,
        };

        handler
          .dataPost(
            "/opportunity/updateOpportunity",
            updatableDataforOpportunity,
            {}
          )
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);

              const logData = [];

              if (
                opportunityData.lead_name !== opportunityExistingData.lead_name
              ) {
                logData.push({
                  key: "Lead name",
                  value: opportunityData.lead_name,
                });
              }

              if (
                opportunityData.address_id !==
                opportunityExistingData.address_id
              ) {
                logData.push({
                  key: "Address",
                  value: opportunityData.address_id,
                });
              }

              if (
                opportunityData.plant_id !== opportunityExistingData.plant_id
              ) {
                logData.push({
                  key: "Plant",
                  value: opportunityData.plant_id,
                });
              }

              if (
                opportunityData.project_manager !==
                opportunityExistingData.project_manager
              ) {
                logData.push({
                  key: "Project Manager",
                  value: opportunityData.project_manager,
                });
              }

              if (
                opportunityData.startDate !== opportunityExistingData.startDate
              ) {
                logData.push({
                  key: "Start Date",
                  value: opportunityData.startDate,
                });
              }

              if (opportunityData.endDate !== opportunityExistingData.endDate) {
                logData.push({
                  key: "End Date",
                  value: opportunityData.endDate,
                });
              }

              if (
                opportunityData.bidDueDate !==
                opportunityExistingData.bidDueDate
              ) {
                logData.push({
                  key: "Bid Due Date",
                  value: opportunityData.bidDueDate,
                });
              }

              if (
                opportunityData.estimated_yard !==
                opportunityExistingData.estimated_yard
              ) {
                logData.push({
                  key: "Estimated Yards",
                  value: opportunityData.estimated_yard,
                });
              }

              if (opportunityData.status !== opportunityExistingData.status) {
                logData.push({
                  key: "Status",
                  value: opportunityData.status,
                });
              }

              if (opportunityData.notes !== opportunityExistingData.notes) {
                logData.push({
                  key: "Notes",
                  value: opportunityData.notes,
                });
              }

              if (logData.length != 0) {
                addLogs("Opportunity updated", "opportunity", id, logData);
              } else {
                message.info("No field is updated");
              }
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updateOpportunityInfo", error);
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
              const logData = [];

              if (
                followupData.contactPersonName !==
                followupExistingData.contactPersonName
              ) {
                logData.push({
                  key: "Contact Person Name",
                  value: followupData.contactPersonName,
                });
              }

              if (
                followupData.typeOfContact !==
                followupExistingData.typeOfContact
              ) {
                logData.push({
                  key: "Type of Contact",
                  value: followupData.typeOfContact,
                });
              }

              if (
                followupData.contactDate !== followupExistingData.contactDate
              ) {
                logData.push({
                  key: "Contact Date",
                  value: followupData.contactDate,
                });
              }

              if (followupData.contactNo !== followupExistingData.contactNo) {
                logData.push({
                  key: "Contact No",
                  value: followupData.contactNo,
                });
              }

              if (followupData.email !== followupExistingData.email) {
                logData.push({
                  key: "Contact Email",
                  value: followupData.email,
                });
              }

              if (
                followupData.description !== followupExistingData.description
              ) {
                logData.push({
                  key: "Follow up Description",
                  value: followupData.description,
                });
              }

              if (
                followupData.onSiteVisit !== followupExistingData.onSiteVisit
              ) {
                logData.push({
                  key: "On Site Visit",
                  value: followupData.onSiteVisit,
                });
              }

              if (
                followupData.nextMeetingDate !==
                followupExistingData.nextMeetingDate
              ) {
                logData.push({
                  key: "Next Meeting Date",
                  value: followupData.nextMeetingDate,
                });
              }

              if (logData.length != 0) {
                addLogs("Follow-up updated", "followup", id, logData);
              } else {
                message.info("No field is updated");
              }
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updatefollowup", error);
          });
        break;
      case "followup-opportunity":
        setLoading(true);

        let updatableDataforfollowupopportunity = {
          ...followupData,
          id: id,
          section_name: "followup-opportunity",
        };

        handler
          .dataPost(
            "/follow-up-section/updatefollowup",
            updatableDataforfollowupopportunity,
            {}
          )
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              const logData = [];

              if (
                followupData.contactPersonName !==
                followupExistingData.contactPersonName
              ) {
                logData.push({
                  key: "Contact Person Name",
                  value: followupData.contactPersonName,
                });
              }

              if (
                followupData.typeOfContact !==
                followupExistingData.typeOfContact
              ) {
                logData.push({
                  key: "Type of Contact",
                  value: followupData.typeOfContact,
                });
              }

              if (
                followupData.contactDate !== followupExistingData.contactDate
              ) {
                logData.push({
                  key: "Contact Date",
                  value: followupData.contactDate,
                });
              }

              if (followupData.contactNo !== followupExistingData.contactNo) {
                logData.push({
                  key: "Contact No",
                  value: followupData.contactNo,
                });
              }

              if (followupData.email !== followupExistingData.email) {
                logData.push({
                  key: "Contact Email",
                  value: followupData.email,
                });
              }

              if (
                followupData.description !== followupExistingData.description
              ) {
                logData.push({
                  key: "Follow up Description",
                  value: followupData.description,
                });
              }

              if (
                followupData.onSiteVisit !== followupExistingData.onSiteVisit
              ) {
                logData.push({
                  key: "On Site Visit",
                  value: followupData.onSiteVisit,
                });
              }

              if (
                followupData.nextMeetingDate !==
                followupExistingData.nextMeetingDate
              ) {
                logData.push({
                  key: "Next Meeting Date",
                  value: followupData.nextMeetingDate,
                });
              }

              if (logData.length != 0) {
                addLogs(
                  "Follow-up updated",
                  "followup-opportunity",
                  id,
                  logData
                );
              } else {
                message.info("No field is updated");
              }
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updatefollowup", error);
          });
        break;

      case "qualitycontrol-opportunity":
        setLoading(true);

        let updatableDataforQCopportunity = {
          ...qualityControlData,
          id: id,
          section_name: "qualitycontrol-opportunity",
        };

        handler
          .dataPost(
            "/quality-control/updateQualityControl",
            updatableDataforQCopportunity,
            {}
          )
          .then((response) => {
            setLoading(false);
            if (response.status == 200) {
              message.success(response.data.message);
              const logData = [];

              if (
                qualityControlData.loadingPlant !==
                qualityControlExistingData.loadingPlant
              ) {
                logData.push({
                  key: "Loading Plant",
                  value: qualityControlData.loadingPlant,
                });
              }

              if (
                qualityControlData.mixDesignName !==
                qualityControlExistingData.mixDesignName
              ) {
                logData.push({
                  key: "Mix Design Name",
                  value: qualityControlData.mixDesignName,
                });
              }

              if (
                qualityControlData.minPrice !==
                qualityControlExistingData.minPrice
              ) {
                logData.push({
                  key: "Min Price",
                  value: qualityControlData.minPrice,
                });
              }

              if (
                qualityControlData.approvedDesign !==
                qualityControlExistingData.approvedDesign
              ) {
                logData.push({
                  key: "Approved Design",
                  value: qualityControlData.approvedDesign,
                });
              }

              if (qualityControlData.tr3 !== qualityControlExistingData.tr2) {
                logData.push({
                  key: "TR3",
                  value: qualityControlData.tr3,
                });
              }

              if (qualityControlData.tr2 !== qualityControlExistingData.tr2) {
                logData.push({
                  key: "TR2",
                  value: qualityControlData.tr2,
                });
              }

              if (
                qualityControlData.price !== qualityControlExistingData.price
              ) {
                logData.push({
                  key: "Price",
                  value: qualityControlData.price,
                });
              }

              if (
                qualityControlData.estimatedYards !==
                qualityControlExistingData.estimatedYards
              ) {
                logData.push({
                  key: "Estimated Yards",
                  value: qualityControlData.estimatedYards,
                });
              }

              if (logData.length != 0) {
                addLogs("Quality Control updated", "opportunity", id, logData);
              } else {
                message.info("No field is updated");
              }
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- updatequalitycontrol", error);
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
              getConstructionCompanyForProjectManager();
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

      case "add_construction_company":
        setLoading(true);

        handler
          .dataPost("/construction-company/addCC", ccData, {})
          .then((response) => {
            setLoading(false);
            if (response.status == 201) {
              message.success("success");

              getConstructionCompanyForProjectManager();
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

      case "opportunity":
        setLoading(true);

        const construction_company_name = cc.find((element) => {
          if (element.id === companyId) {
            return element.construction_company_name;
          }
          return null;
        });

        let opportunitydata = {
          lead_name: leadInformationData.leadTitle,
          address_id: leadInformationData.address,
          estimated_yard: leadInformationData.estimatedYards,
          plant_id: "",
          construction_company:
            construction_company_name.construction_company_name,
          project_manager: "",
          startDate: leadInformationData.startDate,
          endDate: leadInformationData.endDate,
          bidDueDate: leadInformationData.BidDueDate,
          status: leadInformationData.status,
          notes: leadInformationData.notes,
        };

        setOpportunityData({
          ...opportunitydata,
        });

        setOpportunityExistingData({
          ...opportunityData,
        });

        handler
          .dataPost("/opportunity/addOpportunity", opportunitydata, {
            authorization: localStorage.getItem("token"),
          })
          .then((response) => {
            setLoading(false);
            if (response.status == 201) {
              setId(response.data.data);
              setOpportunityModalVisible(true);
              message.success(response.data.message);
              setPageName("opportunity");
              window.history.replaceState(null, "React App", "/opportunity");
              getProjectManagerAPICall("opportunity");
              getPlants();
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- addOpportunity", error);
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

      case "followup-opportunity":
        setLoading(true);

        let followupdataopportunity = {
          ...followupData,
          section_name: "opportunity",
        };

        handler
          .dataPost("/follow-up-section/addFollowUp", followupdataopportunity, {
            authorization: localStorage.getItem("token"),
          })
          .then((response) => {
            setLoading(false);
            if (response.status == 201) {
              message.success(response.data.message);
              setFollowupModalVisible(false);
              getFollowups("opportunity");
            } else if (response.status == 400) {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!- addFollowUp", error);
          });
        break;

      case "qualitycontrol-opportunity":
        setLoading(true);

        let qualityControldataopportunity = {
          ...qualityControlData,
          section_name: "opportunity",
        };

        handler
          .dataPost(
            "/quality-control/addQualityControl",
            qualityControldataopportunity,
            {
              authorization: localStorage.getItem("token"),
            }
          )
          .then((response) => {
            setLoading(false);
            if (response.status == 201) {
              message.success(response.data.message);
              setQualityControlModalVisible(false);
              getQualityControls("opportunity");
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
  const getProjectManagerAPICall = (modalName) => {
    setLoading(true);
    handler
      .dataGet("/project-manager/getPMs", {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          if (modalName === "opportunity") {
            setProjectManager(response.data.data);
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

  const getPlants = () => {
    setLoading(true);
    handler
      .dataGet("/opportunity/getPlants", {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setPlant(response.data.data);
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

  // add logs
  const addLogs = (operationName, sectionName, sectionDataid, updatedField) => {
    setLoading(true);
    let logdata = {
      updatedField: updatedField,
      operationName: operationName,
      sectionName: sectionName,
      sectionDataid: sectionDataid,
    };
    handler
      .dataPost("/audit-logs/addLogs", logdata, {
        authorization: localStorage.getItem("token"),
      })
      .then((response) => {
        setLoading(false);
        if (response.status == 201) {
          if (sectionName === "lead") {
            getLeads();
          } else if (sectionName === "opportunity") {
            getOpportunities();
          } else if (sectionName === "followup") {
            getFollowups("lead");
          }
        } else if (response.status == 200) {
          if (sectionName === "lead") {
            getLeads();
          } else if (sectionName === "opportunity") {
            getOpportunities();
          } else if (sectionName === "followup") {
            getFollowups("lead");
          }
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- addLogs", error);
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
  const getMixDesigns = (type, modalName) => {
    setLoading(true);

    handler
      .dataGet("/mix-design/getMixDesigns?mixType=" + type, {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          if (modalName === "qualitycontrol-opportunity") {
            setMixDesign(response.data.data);
          } else {
            setDataSource(response.data.data);
          }
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getMixDesigns", error);
      });
  };

  const getMixDesignById = (id) => {
    setLoading(true);

    handler
      .dataGet("/mix-design/getMixDesignById?id=" + id, {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setQualityControlData({
            ...qualityControlData,
            minPrice: response.data.data.minRate,
            mixDesignName: response.data.data.mixDesignName,
            mixDesignId: response.data.data.id,
          });
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

  const getQualityControls = (section_name) => {
    setLoading(true);

    handler
      .dataGet(
        "/quality-control/getQualityControls?section_name=" + section_name,
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
        console.error("There was an error!- getQualityControls", error);
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
        getConstructionCompanyForProjectManager();
        break;

      case "opportunity":
        getOpportunities();
        getConstructionCompanyForProjectManager();
        getAuditLogs("opportunity");
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

  const getOpportunities = () => {
    setLoading(true);
    handler
      .dataGet("/opportunity/getOpportunities", {})
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setDataSource(response.data.data);
          setOpportunities(response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getOpportunities", error);
      });
  };

  // upload api call
  const uploadAPICall = (file, destination, feature) => {
    const formData = new FormData();
    console.log("file: ", file + " |" + destination);
    if (destination === "profile") {
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

    console.log(formData);

    handler
      .dataPost("/auth/upload", formData, {})
      .then((response) => {
        setLoading(true);
        if (response.data.status == 200) {
          setLoading(false);
          if (feature === "approvedDesign") {
            setQualityControlData({
              ...qualityControlData,
              approvedDesign: response.data.imageRef,
            });
          } else if (feature === "tr3") {
            setQualityControlData({
              ...qualityControlData,
              tr3: response.data.imageRef,
            });
          } else if (feature === "tr2") {
            setQualityControlData({
              ...qualityControlData,
              tr2: response.data.imageRef,
            });
          } else {
            // setUserData({ userProfileImage: response.data.imageRef });
            userData.userProfileImage = response.data.imageRef;
            setImageUrl(response.data.imageRef);
            setDocumentId(response.data.imageRef);
            setMixDesignData({
              ...mixDesignData,
              documentPath: response.data.imageRef,
            });
          }

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
    renderConstructionCompanyModal,
    constructionCompanyShowModal,
    renderAddCCModal,
    opportunityInfoTblHeaders,
    renderOpportunityModal,
    renderQuotationModal,
  };

  return StatesContainer;
}

export default ContentPageLogic;
