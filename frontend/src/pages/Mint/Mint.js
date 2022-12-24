import React, {useState} from "react";
import * as steps from "./steps";

function Mint(){
    const [data, setData] = useState({});
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false)

    // Switch statement to render the correct step
    function render(){
        switch(step){
            case 1:
                return <steps.Step1 setStep={setStep} setLoading={setLoading} data={data} setData={setData}/>;
            default:
                return <div>Something went wrong</div>;
        }
    }

    return (
        <>
            <div className="items-center-container">
                {!loading && render()}
                {loading && <h1>Loading...</h1>}
            </div> 
        </>
        
    );
}

export default Mint;