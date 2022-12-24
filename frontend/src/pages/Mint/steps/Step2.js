import React, {useState, useEffect, useContext} from "react";
import { ButtonProceed, ButtonCancel } from "../../../components/Buttons";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import AuthContext from "../../../context/auth-context";
import {Form, TextInput} from "../../../components/Form";


function Step2(props) {
    const auth = useContext(AuthContext);
    const [donationAmount, setDonationAmount] = useState(0);

    async function nextStep() {
        if (!localStorage.getItem("desoKey")) {
            await auth.login();
        }
        props.setLoading(true);
        console.log(parseFloat(donationAmount))
        if (parseFloat(donationAmount) > 0) {
            try {
                const desoNanoAmount = parseFloat(donationAmount) * 1000000000;
                const request = {
                    "SenderPublicKeyBase58Check": localStorage.getItem("desoKey"),
                    "RecipientPublicKeyOrUsername": "BC1YLgC8BNgvhpgGxg8S4tmhAdG7ev2biJpH5zVQG8YULYtgwsiZ4W5",
                    "AmountNanos": desoNanoAmount,
                    "MinFeeRateNanosPerKB": 1000
                }
                await auth.deso.wallet.sendDesoRequest(request);
                toast.success("Thank you!");
                props.setStep(3);
            } catch (e) {
                toast.error(e.response? e.response.data.error : e.message);
            }
        }
        props.setLoading(false);
    }

    return (
        <div className="items-center-container" style={{display:"flex", flexDirection:"column", textAlign: "center", alignItems: "center", height: "100vh", padding: "10px"}}>
            <h1>Donate to the snowflakes</h1>
            <p style={{marginBottom: "50px", marginTop: "10px", maxWidth: "500px"}}>Add an optional donation to help preserve the natural beauty of the arctic.</p>
            <Form style={{maxWidth: "500px"}}>
                <TextInput type="number" placeholder="0" value={donationAmount} onChange={e => setDonationAmount(e.target.value)} prefix="$DESO"/>
            </Form>
            <ButtonProceed style={{width: '100%', maxWidth: "550px", marginTop: "50px"}} onClick={nextStep}>Proceed</ButtonProceed>
        </div>
    )

}

export default Step2;