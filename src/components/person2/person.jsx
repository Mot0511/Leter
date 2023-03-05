import React from 'react';
import cl from './person.module.css'

const Person2 = ({avatar, lastname, login, surname, chatid, callback}) => {
    return (
        <div className={cl.item}><button onClick={callback}>
            <div className={cl.info}>
                <div className={cl.avatar} style={{backgroundImage: `url(${avatar})`}}></div>
                <p className={cl.name}>{surname} {lastname}</p>
                <p className={cl.login}>@{login}</p>
            </div>

        </button></div>
    );
};

export default Person2;