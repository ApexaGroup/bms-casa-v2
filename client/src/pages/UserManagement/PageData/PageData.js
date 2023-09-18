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
    },
    // role: {
    //   page: "role",
    //   buttonText: "Add Role",
    // },
    construction_company: {
      page: "construction_company",
      buttonText: "Add Construction Company",
    },
    project_manager: {
      page: "project_manager",
      buttonText: "Add Project Manager",
    },
    extra_charges: {
      page: "extra_charges",
      buttonText: "Add Extra Charges",
    },
    over_time_fees: {
      page: "over_time_fees",
      buttonText: "Add Overtime fees",
    },
    short_load_charges: {
      page: "short_load_charges",
      buttonText: "Add Short Load Charges",
    },
    premium_rates: {
      page: "premium_rates",
      buttonText: "Add premium rates",
    },
    house_mix_design: {
      page: "house_mix_design",
      buttonText: "Add house mix design",
    },
    special_mix_design: {
      page: "special_mix_design",
      buttonText: "Add special mix design",
    },

    address: {
      page: "address",
      buttonText: "Add address",
    },
    lead: {
      page: "lead",
      buttonText: "Add lead",
    },
    opportunity: {
      page: "opportunity",
      buttonText: "Add Opportunity",
    },
    quotation: {
      page: "quotation",
      buttonText: "Add Quotation",
    },
    terms_short_details: {
      page: "terms_short_details",
      buttonText: "Add Short Details",
    },
    terms_full_details: {
      page: "terms_full_details",
      buttonText: "Add Full Details",
    },

    pending: {
      page: "pending",
      buttonText: ""
    },
    approved: {
      page: "approved",
      buttonText: ""
    },
  };

  return data;
};

export { pageData };
