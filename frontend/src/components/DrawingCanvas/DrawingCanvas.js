import React from "react";
import Sketch from "react-p5";

function DrawingCanvas(props) {
    let symmetry = 6;
    let angle = 360 / symmetry;
    let colorPicker;

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

        if (p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height) {
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

    return <Sketch setup={setup} draw={draw} style={{zIndex: 1}} />;
}

export default DrawingCanvas;
