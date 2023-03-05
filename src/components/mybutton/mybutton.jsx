import React from 'react';
import cl from "./mybutton.module.css";

const Mybutton = (props) => {
    return (
        <button className={cl.button} {...props} style={props.style}>{props.text}{props.children}</button>
    );
};

export default Mybutton;