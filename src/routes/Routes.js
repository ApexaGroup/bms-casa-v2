import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import TheLayout from "../containers/TheLayout";
import ForgotPasswordPageDesign from "../pages/ForgotPassword/ForgotPasswordPageDesign";

import Login from "../pages/Login/LoginPageDesign";

export default function () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/forgotPassword"
          element={<ForgotPasswordPageDesign />}
        ></Route>

        <Route path="/dashboard" element={<TheLayout />}></Route>
      </Routes>
    </Router>
  );
}
