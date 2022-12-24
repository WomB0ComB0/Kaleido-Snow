import React, {useState} from "react";
import * as steps from "./steps";

function Mint(){
    const [data, setData] = useState(localStorage.getItem("mintData") ? JSON.parse(localStorage.getItem("mintData")) : {});
    const [step, setStep] = useState(localStorage.getItem("mintStep") ? JSON.parse(localStorage.getItem("mintStep")) : 1);
    const [loading, setLoading] = useState(false)

    function updateMintData(data){
        localStorage.setItem("mintData", JSON.stringify({...data, "step": step}));
        setData(data);
    }

    function updateStep(step){
        localStorage.setItem("mintStep", step);
        setStep(step);
    }

    // Switch statement to render the correct step
    function render(){
        switch(step){
            case 1:
                return <steps.Step1 setStep={updateStep} setLoading={setLoading} data={data} setData={updateMintData}/>;
            case 2:
                return <steps.Step2 setStep={updateStep} setLoading={setLoading} data={data} setData={updateMintData}/>;
            case 3:
                return <steps.Step3 setStep={updateStep} setLoading={setLoading} data={data} setData={updateMintData}/>;
            default:
                return <div>Something went wrong</div>;
        }
    }

    return (
        <>
            <div className="items-center-container">
                {!loading && render()}
                {loading && <div className="dark-container" style={{"width": "100vw", "height": "100vh"}}><div className="items-center-container"><h1>Loading...</h1></div></div>}
            </div> 
        </>
        
    );
}

export default Mint;