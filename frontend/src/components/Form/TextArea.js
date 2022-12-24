import React from "react";
import "./Form.css";

function TextArea(props) {
    return (
        <>
            <label>{props.label}</label>
            <textarea wrap="hard" class="form-field" type={props.type} value={props.value} onChange={props.onChange} />
        </>
    )
    
}

export default TextArea;