import React from 'react';
import cl from './myinput.module.css'

const Myinput = (props) => {
    return (
        <input placeholder={props.text} {...props} style={props.style} className={cl.input}/>
    );
};

export default Myinput;