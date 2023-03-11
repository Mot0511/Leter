import React, {useEffect, useMemo, useState} from 'react';
import cl from './chats.module.css'
import Mybutton from "../components/mybutton/mybutton";
import Person from "../components/person/person";
import Person2 from "../components/person2/person";
import {collection, doc, getDoc, getDocs, getFirestore, query, where} from "firebase/firestore";
import {getDatabase, ref, set, onValue, child, get} from 'firebase/database'
import {useCookies} from "react-cookie";
import initApp from "../scripts/initApp";
import Messages from "../components/messages/messages";
import forObjects from "../scripts/forObjects";

const Chats = () => {
    let [cookie] = useCookies()
    const [visible, setVisible] = useState(true)

    const app = initApp()
    const db = getFirestore(app)
    const dbr = getDatabase(app)

    const [chat, setChat] = useState([])

    useEffect(() => {
        onValue(ref(dbr, 'chats/0/chat/'), (snapshot) => {
            if (!snapshot.val()) {
                setChat([])
            }
            else{
                setChat(snapshot.val())
            }

        });
    }, [])
    useMemo(() => {
        const dbRef = ref(getDatabase())
        get(child(dbRef, 'chats/0/chat/'))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setChat(snapshot.val())
                }
                else {
                    console.log('No data available')
                }
            }).catch(err => {
            console.log(err);
        })

    }, [])

    const showchat = () => {
        setVisible(true)

    }

    const send = (text) => {
        console.log(chat);
        const newMessages = [...chat, [cookie.login, text]]
        set(ref(dbr, 'chats/0/chat/'), newMessages);
        setChat(newMessages)
    }

    return (
        <div className={cl.chats}>
            <h2>Сообщения</h2>
            <Person2 surname={'Matvey2'} lastname={'Suvorov2'} login={'login2'} callback={showchat}/>
            {
                visible
                    ? <Messages chat={chat} send={send} />
                    : <></>
            }

        </div>
    );
};

export default Chats;