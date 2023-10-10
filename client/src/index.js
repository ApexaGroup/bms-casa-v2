import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./routes/Routes";
import store from "./store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Routes />
  </Provider>
);
