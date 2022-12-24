import React from "react";
import Sketch from "react-p5";
import { ButtonProceed } from "../Buttons";

function DrawingCanvas(props) {
    let symmetry = 6;
    let angle = 360 / symmetry;
    let colorPicker;

    function mouseIsInBox(p5, x1, x2, y1, y2){
        return (p5.mouseX > x1 && p5.mouseX < x2 && p5.mouseY > y1 && p5.mouseY < y2);
    }

    const setup = (p5, canvasParentRef) => {
		p5.createCanvas(500, 500).parent(canvasParentRef);
        p5.angleMode(p5.DEGREES)
        // Color picker
        colorPicker = p5.createColorPicker('#000000').parent(canvasParentRef);
        colorPicker.position(430, 460);
        p5.background(127, 127, 127, 127);
	};

	const draw = (p5) => {
		p5.translate(p5.width/2, p5.height/2);

        if (mouseIsInBox(p5, 0, p5.width, 0, p5.height) && !mouseIsInBox(p5, 430, 500, 460, 500)) {
            let mx = p5.mouseX - p5.width / 2;
            let my = p5.mouseY - p5.height / 2;
            let pmx = p5.pmouseX - p5.width / 2;
            let pmy = p5.pmouseY - p5.height / 2;
            
            if (p5.mouseIsPressed) {
                for (let i = 0; i < symmetry; i++) {
                    p5.rotate(angle);
                    let sw = 2;
                    p5.strokeWeight(sw);
                    p5.stroke(colorPicker.color());
                    p5.line(mx, my, pmx, pmy);
                    p5.push();
                    p5.scale(1, -1);
                    p5.line(mx, my, pmx, pmy);
                    p5.pop();
                }
            }
        }
	};

    function proceed() {
        // Ugly but necessary hack to get the current canvas image
        // Perhaps useRef may help but IDK how to do it w/ p5's canvas thingy
        // Get the current canvas image from p5
        let canvas = document.getElementById("defaultCanvas0");
        let image = canvas.toDataURL("image/png");
        // Send the image to the parent component
        props.onProceed(image);
    }

    // Although I'd like this to be pure, unfortunately, we can't get access to the image
    // Outside of this component. Hence, the proceed button has to be inside this component.
    return (
        <div
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
            }}
      >
        <Sketch setup={setup} draw={draw} />
        <ButtonProceed style={{ width: "100%", marginTop: "5px" }} onClick={proceed}>
          Proceed
        </ButtonProceed>
      </div>
    );
}

export default DrawingCanvas;
