import React, {useEffect, useMemo, useState} from 'react';
import cl from './messages.module.css'
import Myinput from "../myinput/myinput";
import Mybutton from "../mybutton/mybutton";
import forObjects from "../../scripts/forObjects";
import Person2 from "../person2/person";
import sendIcon from '../../img/send.png'
import back from '../../img/back.png'
import $ from 'jquery';


const Messages = ({chat, send, setVisible}) => {
    const [text, setText] = useState('')
    const [isEnter, setIsEnter] = useState(false)
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Enter') {
            if (!isEnter){

                send()
                console.log('Enter')
                setIsEnter(true)
            }
        }
    });
    if (!chat) {
        chat = []
    }
    return (
        <div className={cl.messages}>
            <div className={cl.user}>
                <Mybutton onClick={() => {
                    setVisible(false)
                }} style={{width: '50px'}}><img width={'30px'} src={back} alt=""/></Mybutton>
                <h3>Сообщения</h3>
            </div>
            <div className={cl.chat} id={'chat'}>
            {
                chat.map(mess => {
                    return (<div className={cl.mess}>
                        <p className={cl.login}>@{mess[0]}</p>
                        <p className={cl.text}>{mess[1]}</p>
                    </div>)
                })
            }
            </div>
            <div className={cl.inputs}>
                <Myinput text={'Собщение'} autocomplete="off" id={'inputText'} value={text} onChange={e => setText(e.target.value)} />
                <Mybutton onClick={() => {
                    setText('')
                    send(text)
                    document.getElementById('inputText').focus()
                }}><img width={'40px'} height={"40px"} src={sendIcon} alt=""/></Mybutton>
            </div>
        </div>
    );
};

export default Messages;