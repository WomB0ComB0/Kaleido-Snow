import React, {useState, useEffect, useContext} from "react";
import { ButtonProceed, ButtonCancel } from "../../../components/Buttons";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/auth-context";
import {toast} from "react-hot-toast";
import axios from "axios";

function Step1(props) {
    const [cancelling, setCancelling] = useState()
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    async function nextStep() {
        if (!localStorage.getItem("desoKey")) {
            await auth.login();
        }
        props.setLoading(true);
        try {
            // Check if the image already exists w/ axios
            const imageExistsResp = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/check-hash`, {"image_b64": image});
            if (!imageExistsResp.data.success) {
                toast.error("This image already exists. Please restart the process.");
                props.setLoading(false);
                return;
            }

            // Convert image from b64 to file
            const byteString = atob(image.split(',')[1]);
            const mimeString = image.split(',')[0].split(':')[1].split(';')[0]
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], {type: mimeString});
            const file = new File([blob], "snowflake.png", {type: mimeString});
            const request = {
                "UserPublicKeyBase58Check": localStorage.getItem("desoKey"),
                "file": file,
            }
            const resp = await auth.deso.media.uploadImage(request);
            console.log(resp)
            props.setData({...props.data, uploadUrl: resp.ImageURL});
            props.setStep(2);
        } catch (e) {
            console.log(e)
            toast.error(e.response ? e.response.data.message : "Something went wrong");
        }
        props.setLoading(false);
    }

    async function cancel(){
        setCancelling(true);
        await new Promise(resolve => setTimeout(resolve, 4000));
        navigate("/");
    }

    useEffect(() => {
        const img = localStorage.getItem("snowflake");
        if (!img) {
            navigate("/");
        }
        setImage(img);
    }, []);

    return (
        <div className="items-center-container" style={{display:"flex", flexDirection:"column", textAlign: "center", alignItems: "center", height: "100vh", padding: "10px"}}>
            {!cancelling &&
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h1>Congratulations!</h1>
                    <p>Here is your freshly drawn snowflake.</p>
                    {/* Render the b64 image from props */}
                    <img src={image} alt="Snowflake" style={{width: '100%', maxWidth: '500px', marginBottom: '50px', marginTop: '20px'}}/>
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