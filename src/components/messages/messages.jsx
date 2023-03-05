import React from 'react';
import cl from './messages.module.css'

const Messages = ({messages}) => {
    return (
        <div className={cl.messages}>
            <div className={cl.chat}>
            {
                messages.map(mess => {
                    return (<div className={cl.mess}>
                        <p className={cl.user}>@{mess.user}</p>
                        <p className={cl.text}>{mess.text}</p>
                    </div>)
                })
            }
            </div>
        </div>
    );
};

export default Messages;