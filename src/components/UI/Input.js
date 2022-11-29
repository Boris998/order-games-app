import React from "react";
import classes from './Input.module.css';

//all key val pairs in the input obj, which we receive on props.input are added to input
//  {...props.input} ~= --> {type: 'text'}

const Input = React.forwardRef((props, ref) => {
    return <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input}/>
    </div>
});

export default Input;