import React from "react";
import "./Form.css";

function TextInput(props) {
    return (
        <>
            {props.prefix && <span>{props.prefix}</span>}
            <input class="form-field" type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
            {props.suffix && <span>{props.suffix}</span>}
        </>
    )
    
}

export default TextInput;