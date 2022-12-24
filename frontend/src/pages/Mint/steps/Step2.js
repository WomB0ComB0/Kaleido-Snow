import React, {useState, useEffect} from "react";
import { ButtonProceed, ButtonCancel } from "../../../components/Buttons";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";


function Step1(props) {
    const [cancelling, setCancelling] = useState()
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    async function nextStep() {
        props.setLoading(true);
        try {
            const resp = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
                image
            });
            console.log(resp);
            props.setData({...props.data, uploadUrl: resp.data.upload_url});
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
        <div style={{textAlign: 'center'}}>
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