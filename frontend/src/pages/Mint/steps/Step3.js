import React, {useState, useEffect, useContext} from "react";
import { ButtonProceed, ButtonCancel } from "../../../components/Buttons";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import AuthContext from "../../../context/auth-context";
import {Form, TextArea} from "../../../components/Form";


function Step3(props) {
    const auth = useContext(AuthContext);
    const [postBody, setPostBody] = useState(props.data.donationAmount > 0 ? `I just donated ${props.data.donationAmount} $DESO to help save the arctic! Learn more at <insert_domain_here>!` : "I just minted this snowflake on <insert_domain_here>!\n\nHelp save the snowflakes by donating to the cause.");

    async function nextStep() {
        if (!localStorage.getItem("desoKey")) {
            await auth.login();
        }
        props.setLoading(true);
        try {
            const request = {
                "UpdaterPublicKeyBase58Check": localStorage.getItem("desoKey"),
                "BodyObj": {
                    "Body": postBody,
                    "ImageURLs": [props.data.uploadUrl]
                }
            }
            const resp = await auth.deso.posts.submitPost(request);
            console.log(resp);
            toast.success("Posted!");
            props.setStep(4);
        } catch (e) {
            toast.error(e.response? e.response.data.error : e.message);
        }
        props.setLoading(false);
    }

    return (
        <div style={{display:"flex", flexDirection:"column", textAlign: "center", alignItems: "center", padding: "10px"}}>
            <h1>Post about it!</h1>
            <p style={{marginBottom: "50px", marginTop: "10px", maxWidth: "500px"}}>Post your snowflake for the world to see</p>
            <Form style={{maxWidth: "500px"}}>
                <TextArea type="text" placeholder="Your message here" value={postBody} onChange={e => setPostBody(e.target.value)} label="Body"/>
            </Form>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px", maxWidth: "500px", textAlign: "left"}}>
                <h2 style={{marginBottom: "50px"}}>Preview</h2>
                <p style={{marginBottom: "20px", width: "100%", textAlign: "left", whiteSpace: "pre-wrap", fontSize: "18px"}}>{postBody}</p>
                <img src={props.data.uploadUrl} width="500px" height="500px"/>
            </div>
            <ButtonProceed style={{width: '100%', marginTop: "50px"}} onClick={nextStep}>Proceed</ButtonProceed>
        </div>
    )

}

export default Step3;