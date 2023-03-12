import React, {useEffect, useState} from 'react';
import './profile.css'
import Mybutton from "../components/mybutton/mybutton";
import {useParams} from "react-router";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import initApp from "../scripts/initApp";
import {useCookies} from "react-cookie";
import {useNavigate, Link} from "react-router-dom";
import Loading from '../components/loading/loading'
import addFriend from "../scripts/addFriend";
import createChat from "../scripts/createChat";

const Profile = (props) => {
    const app = initApp()
    const [cookie] = useCookies()
    let login = useParams().login
    if (!login) {
        login = cookie.login
    }
    const [surname, setSurname] = useState('')
    const [lastname, setLastname] = useState('')
    const [countFriends, setCountFriends] = useState()
    
    const nav = useNavigate()
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const db = getFirestore(app)
            const data = await getDoc(doc(db, 'users', login))
            setIsVisible(false)
            setSurname(data.data().surname)
            setLastname(data.data().lastname)
            setCountFriends(data.data().countFriends)
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
                            ? <><Mybutton text={'Добавить в друзья'} onClick={() => addFriend(cookie.login, login, () => console.log('Friends added'))} />
                                <Mybutton text={'Написать соообщение'} onClick={() => createChat(cookie.login, login, () => nav(`/chats/`))} /></>
                            : <><Mybutton text={'Опубликовать фото'} />
                                <Mybutton text={'Настройка профиля'} /></>
                    }

                    <div className={'people'}>
                        <Link to={`/friends/${login}`}><div className={'friends'}>
                            <p>{countFriends}</p>
                            <p>Друзей</p>
                        </div></Link>
                    </div>

                </div>
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