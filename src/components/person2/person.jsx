import React from 'react';
import cl from './person.module.css'
import {Link} from "react-router-dom";

const Person2 = ({avatar, lastname, login, surname, chatid, callback}) => {
    return (
        <div className={cl.item}><button onClick={() => callback(chatid)}>
            <div className={cl.info}>
                <Link to={`/profile/${login}`}><div className={cl.avatar} style={{backgroundImage: `url(${avatar})`}}></div></Link>
                <p className={cl.name}>{surname} {lastname}</p>
                <p className={cl.login}>@{login}</p>
            </div>

        </button></div>
    );
};

export default Person2;