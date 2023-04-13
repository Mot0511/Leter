import React from 'react';
import cl from './person.module.css'
import {Link} from "react-router-dom";

const Person2 = ({avatar, lastname, login, surname, chatid, callback, btns, style}) => {
    return (

        <div className={cl.item} style={style}>
            <button onClick={() => callback(chatid)}>
                <div className={cl.info}>
                    <a href={`/profile/${login}`}><div className={cl.avatar} style={{backgroundImage: `url(${avatar})`}}></div></a>
                    <p className={cl.name}>{surname} {lastname}</p>
                    <p className={cl.login}>@{login}</p>
                </div>
            </button>
            <div className={cl.btns}>
                {btns}
            </div>
</div>

    );
};

export default Person2;