import React from "react";
import Snowfall from "react-snowfall";
import { DrawingCanvas } from "../components/DrawingCanvas";
import { useNavigate } from "react-router-dom";

function Draw() {
  const navigate = useNavigate();

  async function proceed(img) {
    // TODO: Backend call here?
    localStorage.setItem("snowflake", img);
    localStorage.setItem("mintStep", 1);
    localStorage.setItem("mintData", JSON.stringify({}));
    navigate("/mint");
  }

  return (
    <>
      <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
        }}
      />
      <DrawingCanvas onProceed={proceed}/>
      <img
        src={require("../images/snow-ground.png")}
        alt="Snow ground"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "40vh",
        }}
      />
    </>
  );
}

export default Draw;
