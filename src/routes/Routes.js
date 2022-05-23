import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TheContent from "../containers/Content/TheContent";
import TheLayout from "../containers/Layout/TheLayout";
import Dashboard from "../pages/Dashboard/DashboardPageDesign";
import ForgotPasswordPageDesign from "../pages/ForgotPassword/ForgotPasswordPageDesign";

import Login from "../pages/Login/LoginPageDesign";
import Role from "../pages/UserManagement/Role/RolePageDesign";
import User from "../pages/UserManagement/User/UserPageDesign";

export default function () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/forgotPassword"
          element={<ForgotPasswordPageDesign />}
        ></Route>

        <Route path="/dashboard" element={<TheLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="user-management" element={<TheContent />}>
            <Route path="user" element={<User />} />
            <Route path="role" element={<Role />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
