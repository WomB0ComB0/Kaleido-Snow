import React from "react";
import { ButtonProceed } from "../components/Buttons";
import Snowfall from "react-snowfall";
import { DrawingCanvas } from "../components/DrawingCanvas";

function Draw() {
  return (
    <>
      <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
        }}
      />
      {/* Centered drawing canvas rendered above everything else */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        <DrawingCanvas/>
        <ButtonProceed style={{ width: "100%", marginTop: "5px" }}>
          Proceed
        </ButtonProceed>
      </div>
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
