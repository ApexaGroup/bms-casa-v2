import React, { useEffect } from "react";
// Antd components imports
import { Input, Button, Table, Modal, Col, Row, Upload } from "antd";
import "./ContentPageCSS.css";

import { ContentPageStates } from "./ContentPageLogic";

const { Search } = Input;

function ContentPageDesign(props) {
  const { data } = props;
  const {
    setPageName,
    pageName,
    dataSource,
    isEdit,
    isModalVisible,
    handleOk,
    handleCancel,
    userData,
    handleChangeData,
    imageUrl,
    uploadButton,
    showModal,
    handleChange,
  } = ContentPageStates();

  useEffect(() => {
    console.log();
    setPageName(data.page);
  }, [data.page]);

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
          <Table
            size="small"
            columns={data.tableColumns}
            dataSource={dataSource}
          />
        </div>

        <div>
          <Modal
            title={isEdit ? "Edit user" : "Add new user"}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
          >
            <Row gutter={6}>
              <Col span={12}>
                <Input
                  placeholder="Username"
                  name="username"
                  value={userData.username}
                  type={"text"}
                  className="input-style"
                  onChange={handleChangeData}
                />
              </Col>
              <Col span={12}>
                <Input
                  placeholder="Password"
                  name="password"
                  value={userData.password}
                  type={"password"}
                  className="input-style"
                  onChange={handleChangeData}
                />
              </Col>
            </Row>
            <Row gutter={6}>
              <Col span={12}>
                <Input
                  className="input-style"
                  placeholder="First Name"
                  name="firstName"
                  value={userData.firstName}
                  type={"text"}
                  onChange={handleChangeData}
                />
              </Col>
              <Col span={12}>
                <Input
                  className="input-style"
                  placeholder="Last Name"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChangeData}
                  type={"text"}
                />
              </Col>
            </Row>
            <Row gutter={6}>
              <Col span={12}>
                <Input
                  className="input-style"
                  placeholder="Contact No"
                  name="contactNo"
                  value={userData.contactNo}
                  type={"phone"}
                  onChange={handleChangeData}
                />
              </Col>
              <Col span={12}>
                <Input
                  className="input-style"
                  placeholder="Address"
                  name="address"
                  value={userData.address}
                  type={"text"}
                  onChange={handleChangeData}
                />
              </Col>
              <Col span={12}>
                <Input
                  className="input-style"
                  placeholder="Alternate No"
                  name="alternateNo"
                  value={userData.alternateNo}
                  type={"phone"}
                  onChange={handleChangeData}
                />
              </Col>
              <Col span={12}>
                <Input
                  className="input-style"
                  placeholder="Default Company ID"
                  name="defaultCompanyId"
                  value={userData.defaultCompanyId}
                  onChange={handleChangeData}
                  type={"text"}
                />
              </Col>
            </Row>
            <Row gutter={6}>
              <Col span={12}>
                <Input
                  className="input-style"
                  placeholder="City"
                  name="city"
                  value={userData.city}
                  onChange={handleChangeData}
                  type={"text"}
                />
              </Col>
              <Col span={12}>
                <Input
                  className="input-style"
                  placeholder="State"
                  name="state"
                  value={userData.state}
                  onChange={handleChangeData}
                  type={"text"}
                />
              </Col>
              <Col span={12}>
                <Input
                  className="input-style"
                  placeholder="Zipcode"
                  name="zipcode"
                  value={userData.zipcode}
                  onChange={handleChangeData}
                  type={"zipcode"}
                />
              </Col>
              <Col span={24}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={handleChange}
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
            </Row>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ContentPageDesign;
