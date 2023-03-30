import React, {useEffect, useMemo, useState} from 'react';
import './profile.css'
import Mybutton from "../components/mybutton/mybutton";
import {useParams} from "react-router";
import {collection, doc, getDoc, getDocs, getFirestore, query, where} from "firebase/firestore";
import initApp from "../scripts/initApp";
import {useCookies} from "react-cookie";
import {useNavigate, Link} from "react-router-dom";
import Loading from '../components/loading/loading'
import friends from "../scripts/friends";
import createChat from "../scripts/createChat";
import Person from "../components/person2/person";

import back from '../img/back.png'
import Requests from "../components/requests/requests";

const Profile = (props) => {
    const app = initApp()
    const db = getFirestore(app)
    const [cookie] = useCookies()
    let login = useParams().login
    if (!login) {
        login = cookie.login
    }
    const [surname, setSurname] = useState('')
    const [lastname, setLastname] = useState('')
    const [countFriends, setCountFriends] = useState()
    const [requests, setRequests] = useState([])

    const [isFriend, setIsFriend] = useState()
    const [isRequested, setIsRequested] = useState()

    const nav = useNavigate()
    const [isVisible, setIsVisible] = useState(true)
    const [isRequests, setIsRequests] = useState(false)


    useMemo(() => {

        const getData = async () => {
            const temp = []
            const data = await getDoc(doc(db, 'users', login))
            const requests = data.data().requests
            if (cookie.login === login && requests.length) {
                const reqUsers = await getDocs(query(collection(db, 'users'), where('login', 'in', requests)))
                reqUsers.forEach(doc => {
                    temp.push([doc.data().login, doc.data().surname, doc.data().lastname])
                })
            }
            data.data().friends.map(friend => {
                if (friend === cookie.login) {
                    setIsFriend(true)

                }
                else {
                    setIsFriend(false)
                }
            })
            data.data().requests.map(req => {
                if (req === cookie.login) {
                    setIsRequested(true)
                }
                else {
                    setIsRequested(false)
                }
            })
            setIsVisible(false)
            setRequests(temp)
            setSurname(data.data().surname)
            setLastname(data.data().lastname)
            setCountFriends(data.data().friends.length)

        }
        if (!cookie.login) {
            nav('/login')
        }
        getData()
    }, [])

    return (
        <div className={''}>
            <div className={'profile'}>
                <div className={'avatar'}>

                </div>
                <div className={'info'}>
                    <p>@{login}</p>
                    {
                        isVisible
                            ? <Loading />
                            : <h2>{surname} {lastname}</h2>
                    }
                    {
                        cookie.login !== login
                            ? <>
                                {
                                    isFriend
                                        ? <Mybutton text={'Удалить из друзей'} onClick={() => friends(cookie.login, login, 'removeFriend', () => {
                                            setCountFriends(countFriends - 1)
                                            setIsFriend(false)
                                        })} />
                                        : isRequested
                                            ? <Mybutton text={'Убрать запрос в друзья'} onClick={() => friends(cookie.login, login, 'removeRequest', () => {
                                                setIsRequested(false)
                                            })} />
                                            : <Mybutton text={'Добавить в друзья'} onClick={() => friends(cookie.login, login, 'sendRequest', () => {
                                                setIsRequested(true)
                                            })} />


                                }
                                <Mybutton text={'Написать соообщение'} onClick={() => createChat(cookie.login, login, () => nav(`/chats/`))} />
                            </>
                            : <><Mybutton text={'Опубликовать фото'} />
                                <Mybutton text={'Настройка профиля'} /></>
                    }

                    <div className={'people'}>
                        <Link to={`/friends/${login}`}><div className={'friends'}>
                            <p>{countFriends}</p>
                            <p>Друзей</p>
                        </div></Link>
                    </div>

                    {requests.length
                        ? window.innerWidth <= 920
                            ? <Mybutton onClick={() => setIsRequests(true)}>{requests.length} заявок в друзья</Mybutton>
                            : <></>
                        : <></>
                    }

                </div>
                {
                    requests.length
                        ? window.innerWidth > 920
                            ? <Requests requests={requests} setRequests={setRequests} />
                            : isRequests
                                ? <Requests requests={requests} setRequests={setRequests} setIsRequests={setIsRequests}/>
                                : <></>
                        : <></>

                }

            </div>
            <div className={'photos'}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Profile;