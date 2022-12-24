import React, {useState} from "react";
import * as steps from "./steps";

function Mint(){
    const [step, setStep] = useState(1);

    // Switch statement to render the correct step
    function render(){
        switch(step){
            case 1:
                return <steps.Step1 setStep={setStep} />;
            default:
                return <div>Something went wrong</div>;
        }
    }

    return (
        <div className="items-center-container">
            {render()}
        </div>
    );
}

export default Mint;