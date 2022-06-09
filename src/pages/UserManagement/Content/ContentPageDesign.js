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
    dataSource,
    isModalVisible,
    tblHeaders,
    getUsersAPIcall,
    showModal,
    UserModal,
  } = ContentPageLogic();

  // useeffect
  useEffect(() => {
    getUsersAPIcall();
  }, []);

  return (
    <div>
      <div>
        <div className="div-page-header">
          <Search placeholder="Search" className="div-search" />
          <Button className="button-add-user" onClick={showModal}>
            {data.buttonText}
          </Button>
        </div>

        <div>
          <Table size="small" columns={tblHeaders} dataSource={dataSource} />
          <h1>{isModalVisible}</h1>
        </div>

        <div>{UserModal}</div>
      </div>
    </div>
  );
}

export default ContentPageDesign;
