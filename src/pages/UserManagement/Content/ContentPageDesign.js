import React, { useEffect } from "react";
// Antd components imports
import { Input, Button, Table, Modal, Col, Row, Upload } from "antd";
import "./ContentPageCSS.css";

import { ContentPageStates } from "./ContentPageLogic";

const { Search } = Input;

function ContentPageDesign(props) {
  const { data } = props;
  const { setPageName, pageName, dataSource } = ContentPageStates();

  useEffect(() => {
    setPageName(data.page);
  }, [data.page]);

  return (
    <div>
      <div>
        <div className="div-page-header">
          <Search placeholder="Search" className="div-search" />
          <Button className="button-add-user">{data.buttonText}</Button>
        </div>

        <div>
          <Table
            size="small"
            columns={data.tableColumns}
            dataSource={dataSource}
          />
        </div>
      </div>
    </div>
  );
}

export default ContentPageDesign;
