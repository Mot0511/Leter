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
import Loading from "../components/loading/loading";
import {useNavigate} from "react-router-dom";

const Chats = () => {
    let [cookie] = useCookies()
    const [visible, setVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const app = initApp()
    const db = getFirestore(app)
    const dbr = getDatabase(app)

    const [chat, setChat] = useState([])
    const [chatid, setChatid] = useState('')

    const [users, setUsers] = useState([])
    const nav = useNavigate()


    useEffect(() => {
        if (!cookie.login) {
            nav('/login')
        }

    }, [])
    useMemo(async () => {
        const logins = []
        const chats = []
        const users = []
        setIsLoading(true)
        const data = await getDoc(doc(db, 'users', cookie.login))
        data.data().chats.map(chat => {
            logins.push(chat.user)
            chats.push(chat.chatid)
        })
        let usersSnap = await getDocs(query(collection(db, 'users'), where('login', 'in', logins)))
        let i = 0
        usersSnap.forEach(user => {
            users.push({login: user.data().login, surname: user.data().surname, lastname: user.data().lastname, chatid: chats[i]})
            i++
        })
        setIsLoading(false)
        setUsers(users)


    }, [])
    const listen = (chatid) => {
        onValue(ref(dbr, `chats/${chatid}/chat/`), (snapshot) => {
            if (!snapshot.val()) {
                setChat([])
                console.log(1);
            }
            else{
                console.log('New message '+chatid);
                setChat(snapshot.val())

            }

        });
    }
    const showchat = (chatid) => {
        // setChatid(chatid)
        setChat([])
        setVisible(true)
        setIsLoading(true)
        const dbRef = ref(getDatabase())
        get(child(dbRef, `chats/${chatid}/chat/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setIsLoading(false)

                }
                else {
                    setIsLoading(false)
                    setChat([])
                }
            }).catch(err => {
            console.log(err);
        })
        setChatid(chatid)
        listen(chatid)
    }

    const send = (text) => {
        const newMessages = [...chat, [cookie.login, text]]
        set(ref(dbr, `chats/${chatid}/chat/`), newMessages);
        setChat(newMessages)
    }


    return (
        <div className={cl.chats}>
            <h2>Сообщения</h2>

            {
                isLoading
                    ? <Loading />
                    : users.map(user => {
                        return <Person2 surname={user.surname} lastname={user.lastname} login={user.login} chatid={user.chatid} callback={showchat}/>
                    })

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