import React from "react";
import {Dropdown} from "y-ui0";
import './FormInput.scss';

export default function FormInput(props){
    const {label,...rest} = props;
    return <div className="FormInput">
        <span className="label">{label}</span>
        <Dropdown {...rest}/>
    </div>
}
