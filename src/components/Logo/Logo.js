// Default react and react-router imports
import React from "react";

// Css design imports
import "./LogoCSS.css";

// Image imports
import casalogo from "../../assets/casa-logo.png";

function Logo() {
  return (
    <div className="app-logo-container">
      <img src={casalogo} className="app-logo" />
    </div>
  );
}

export default Logo;
