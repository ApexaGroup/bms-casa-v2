import React, { useEffect } from "react";

// Antd components imports
import { Input, Button, Table } from "antd";

// ContentPage Custom CSS
import "./ContentPageCSS.css";

/*
@ContentPageLogic contains logic of this form
*/
import ContentPageLogic from "./ContentPageLogic";

const { Search } = Input;

function ContentPageDesign(props) {
  const { data } = props;

  // States from Content Page Logic
  const {
    pageName,
    setPageName,
    dataSource,
    isModalVisible,
    tblHeaders,
    getAllData,
    showModal,
    renderModal,
    generalFields,
    ccTblHeaders,
    userTblHeaders,
    setTblHeaders,
    pmTblHeaders,
    otTblHeaders,
    prTblHeaders,
    slTblHeaders,
    ecTblHeaders,
    mdTblHeaders,
    smdTblHeaders,
    addressTblHeaders,
  } = ContentPageLogic();

  // useeffect
  useEffect(() => {
    setPageName(data.page);
    getAllData(data.page);

    if (data.page === "user") {
      setTblHeaders(userTblHeaders);
    }

    if (data.page === "construction_company") {
      setTblHeaders(ccTblHeaders);
    }

    if (data.page === "project_manager") {
      setTblHeaders(pmTblHeaders);
    }

    if (data.page === "over_time_fees") {
      setTblHeaders(otTblHeaders);
    }

    if (data.page === "premium_rates") {
      setTblHeaders(prTblHeaders);
    }

    if (data.page === "short_load_charges") {
      setTblHeaders(slTblHeaders);
    }

    if (data.page === "extra_charges") {
      setTblHeaders(ecTblHeaders);
    }

    if (data.page === "house_mix_design") {
      setTblHeaders(mdTblHeaders);
    }

    if (data.page === "special_mix_design") {
      setTblHeaders(smdTblHeaders);
    }

    if (data.page === "address") {
      setTblHeaders(addressTblHeaders);
    }
  }, [data.page]);

  return (
    <div>
      <div>
        <div className="div-page-header-parent">
          <h3>{pageName.toUpperCase().replaceAll("_", " ")}</h3>
          <div className="div-page-header">
            <Search placeholder="Search" className="div-search" />
            <Button className="button-add-user" onClick={showModal}>
              {data.buttonText}
            </Button>
          </div>
        </div>

        <div>
          <Table size="small" columns={tblHeaders} dataSource={dataSource} />
        </div>

        <div>{renderModal(pageName, generalFields)}</div>
      </div>
    </div>
  );
}

export default ContentPageDesign;
