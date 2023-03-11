import React, {useEffect, useMemo, useState} from 'react';
import cl from './messages.module.css'
import Myinput from "../myinput/myinput";
import Mybutton from "../mybutton/mybutton";
import forObjects from "../../scripts/forObjects";

const Messages = ({chat, send}) => {
    const [text, setText] = useState()
    if (!chat) {
        chat = []
    }
    return (
        <div className={cl.messages}>
            <div className={cl.chat}>
            {

                chat.map(mess => {
                    return (<div className={cl.mess}>
                        <p className={cl.user}>@{mess[0]}</p>
                        <p className={cl.text}>{mess[1]}</p>
                    </div>)
                })
            }
            </div>
            <div className={cl.inputs}>
                <Myinput text={'Собщение'} value={text} onChange={e => setText(e.target.value)} />
                <Mybutton text={'Отправить'} onClick={() => send(text)} />
            </div>
        </div>
    );
};

export default Messages;