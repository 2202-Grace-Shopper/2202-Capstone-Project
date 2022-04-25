import React from "react";
import logo from "../assets/PlantSiteLogo.JPG";

export default function Title() {
  return (
    <>
      {/* <div>we'll put our logo here</div> */}
      <div className="logoDiv">
        <img src={logo} alt="logo pic" className="logoImage"></img>
      </div>
    </>
  );
}
