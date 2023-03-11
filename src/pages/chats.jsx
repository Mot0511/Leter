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
    const [chatid, setChatid] = useState('')

    const [users, setUsers] = useState([])
    const [chats, setChats] = useState([])

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
        const getData = async () => {
            const logins = []
            const chats = []
            const users = []
            const data = await getDoc(doc(db, 'users', cookie.login))
            data.data().chats.map(chat => {
                logins.push(chat.user)
                chats.push(chat.chatid)
            })
            const usersSnap = await getDocs(query(collection(db, 'users'), where('login', 'in', logins)))
            usersSnap.forEach(user => {
                users.push({login: user.data().login, surname: user.data().surname, lastname: user.data().lastname})
            })
            setUsers(users)
            setChats(chats)

        }
        getData()


    }, [])

    const showchat = (chatid) => {

        setVisible(true)
        const dbRef = ref(getDatabase())
        get(child(dbRef, `chats/${chatid}/chat/`))
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
    }

    const send = (text) => {
        console.log(chat);
        const newMessages = [...chat, [cookie.login, text]]
        set(ref(dbr, 'chats/0/chat/'), newMessages);
        setChat(newMessages)
    }

    const getPeople = () => {
        const content = []
        for (let i = 0; i < chat.length; i++){
            content.push(<Person2 surname={users[i].surname} lastname={users[i].lastname} login={users[i].login} chatid={chats[0]} callback={showchat}/>)
        }
        return content
    }

    return (
        <div className={cl.chats}>
            <h2>Сообщения</h2>
            {
                getPeople()
            }

            {
                visible
                    ? <Messages chat={chat} send={send} />
                    : <></>
            }

        </div>
    );
};

export default Chats;