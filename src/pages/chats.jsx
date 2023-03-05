import React, {useMemo, useState} from 'react';
import cl from './chats.module.css'
import Mybutton from "../components/mybutton/mybutton";
import Person from "../components/person/person";
import Person2 from "../components/person2/person";
import {collection, doc, getDoc, getDocs, getFirestore, query, where} from "firebase/firestore";
import {useCookies} from "react-cookie";
import initApp from "../scripts/initApp";
import Messages from "../components/messages/messages";

const Chats = () => {
    const app = initApp()
    const db = getFirestore(app)
    const [cookie] = useCookies()

    const [users, setUsers] = useState()
    const [chats, setChats] = useState()

    const [chat, setChat] = useState([{user: 'Mot0511', text: 'Hello'}, {user: 'login1', text: 'Hi'}])
    const [visible, setVisible] = useState(false)

    useMemo(() => {
        const getData = async () => {
            let users = []
            const chats = []

            let data = await getDocs(query(collection(db, 'chats'), where('users', 'array-contains', cookie.login)))
            data.forEach(doc => {
                chats.push(doc.data().messages)
                users = doc.data().users.filter(user => user === cookie.login)
            })
            setUsers(users)
            setChats(chats)

        }
        getData()


    }, [])

    const showchat = () => {
        setVisible(true)
    }

    return (
        <div className={cl.chats}>
            <h2>Сообщения</h2>
            <Person2 surname={'Matvey2'} lastname={'Suvorov2'} login={'login2'} callback={showchat}/>
            {
                visible
                    ? <Messages messages={chat} />
                    : <></>
            }

        </div>
    );
};

export default Chats;