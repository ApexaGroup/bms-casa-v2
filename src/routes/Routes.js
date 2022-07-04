import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TheContent from "../containers/Content/TheContent";
import TheLayout from "../containers/Layout/TheLayout";
import Dashboard from "../pages/Dashboard/DashboardPageDesign";
import ForgotPasswordPageDesign from "../pages/ForgotPassword/ForgotPasswordPageDesign";

import Login from "../pages/Login/LoginPageDesign";
import Content from "../pages/UserManagement/Content/ContentPageDesign";
import { pageData } from "../pages/UserManagement/PageData/PageData";

export default function () {
  const {
    user,
    role,
    construction_company,
    project_manager,
    extra_charges,
    over_time_fees,
    short_load_charges,
    premium_rates,
    house_mix_design,
    special_mix_design,
    address,
    lead,
    opportunity,
  } = pageData();

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
            <Route path="user" element={<Content data={user} />} />
            <Route path="role" element={<Content data={role} />} />
          </Route>

          <Route path="client-master" element={<TheContent />}>
            <Route
              path="construction-company"
              element={<Content data={construction_company} />}
            />
            <Route
              path="project-manager"
              element={<Content data={project_manager} />}
            />
          </Route>

          <Route path="extra-charges-section" element={<TheContent />}>
            <Route
              path="extra-charges"
              element={<Content data={extra_charges} />}
            />
            <Route
              path="over-time-fees"
              element={<Content data={over_time_fees} />}
            />
            <Route
              path="short-load-charges"
              element={<Content data={short_load_charges} />}
            />
            <Route
              path="premium-rates"
              element={<Content data={premium_rates} />}
            />
          </Route>

          <Route path="company-master" element={<TheContent />}>
            <Route
              path="house-mix-design"
              element={<Content data={house_mix_design} />}
            />
            <Route
              path="special-mix-design"
              element={<Content data={special_mix_design} />}
            />
          </Route>

          <Route path="lead-section" element={<TheContent />}>
            <Route path="address" element={<Content data={address} />} />
            <Route path="lead" element={<Content data={lead} />} />
          </Route>

          <Route
            path="opportunity"
            element={<Content data={opportunity} />}
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
}
