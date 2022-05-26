import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TheContent from "../containers/Content/TheContent";
import TheLayout from "../containers/Layout/TheLayout";
import Dashboard from "../pages/Dashboard/DashboardPageDesign";
import ForgotPasswordPageDesign from "../pages/ForgotPassword/ForgotPasswordPageDesign";

import Login from "../pages/Login/LoginPageDesign";
import Role from "../pages/UserManagement/Role/RolePageDesign";
import User from "../pages/UserManagement/User/UserPageDesign";
import Content from "../pages/UserManagement/Content/ContentPageDesign";
import pageData from "../pages/UserManagement/PageData/PageData";

export default function () {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/forgotPassword"
          element={<ForgotPasswordPageDesign />}
        ></Route>

        <Route path="/" element={<TheLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="" element={<TheContent />}>
            <Route path="user" element={<Content data={pageData.user} />} />
            <Route path="role" element={<Content data={pageData.role} />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
