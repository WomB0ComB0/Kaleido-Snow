import React from "react";
import "./Form.css";

function Form(props) {
    return (
        <form className="form-group" onSubmit={props.onSubmit} style={props.style}>
            {props.children}
        </form>
    );
}

export default Form;