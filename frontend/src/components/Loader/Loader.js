import React from "react";
import "./Loader.css";
import Snowfall from "react-snowfall";

function Loader() {
    return (
        <div style={{top: 0, margin: 0}}>
            <Snowfall />
            <div class="center">
                <canvas id="canvas"></canvas>
                <div class="ring"></div>
                <p class="text">Loading...</p>
            </div>
        </div>
    )
}

export default Loader;