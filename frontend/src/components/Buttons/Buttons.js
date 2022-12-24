import React from 'react';
import "./Buttons.css";

export function ButtonPrimary(props) {
  return (
    <button className="button-primary" onClick={props.onClick}>{props.children}</button>
  );
}