import React, {useState} from "react";
import { ButtonProceed, ButtonCancel } from "../../../components/Buttons";
import { useNavigate } from "react-router-dom";

function Step1(props) {
    const [cancelling, setCancelling] = useState()
    const navigate = useNavigate();

    async function nextStep() {
        props.setStep(2);
    }

    async function cancel(){
        setCancelling(true);
        await new Promise(resolve => setTimeout(resolve, 4000));
        navigate("/");
    }

    return (
        <div style={{textAlign: 'center'}}>
            {!cancelling &&
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h1>Congratulations!</h1>
                    <p>Here is your freshly drawn snowflake.</p>
                    <img src="https://i.imgur.com/1ZQ3Z0M.png" alt="Snowflake" style= {{margin: '50px'}}/>
                    <ButtonProceed style={{width: '100%'}} onClick={nextStep}>Love It!</ButtonProceed>
                    <ButtonCancel style={{width: '100%', marginTop: "10px"}} onClick={cancel}>Retry</ButtonCancel>
                </div>
            }
            {cancelling &&
                <h1 className="fade-in-then-out">It's alright. Try again!</h1>
            }
        </div>
    )
}

export default Step1;