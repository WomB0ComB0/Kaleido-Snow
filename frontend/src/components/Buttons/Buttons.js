import React from 'react';
import "./Buttons.css";

export function ButtonPrimary(props) {
  return (
    <button className="button button-primary" onClick={props.onClick} style={props.style}>{props.children}</button>
  );
}

export function ButtonProceed(props) {
  return (
    <button className="button button-proceed" onClick={props.onClick} style={props.style}>{props.children}</button>
  )
}

export function ButtonCancel(props) {
  return (
    <button className="button button-cancel" onClick={props.onClick} style={props.style}>{props.children}</button>
  )
}
