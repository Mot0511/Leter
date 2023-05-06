import React, {useState} from 'react';
import {initializeApp} from "firebase/app";
import {getFirestore, doc, setDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import cl from './register.module.css'
import Myinput from "../components/myinput/myinput";
import Mybutton from "../components/mybutton/mybutton";
import {useNavigate} from "react-router-dom";
import initApp from "../scripts/initApp";
import {useCookies} from "react-cookie";

const Register = () => {
    const app = initApp()
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [surname, setSurName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [cookie, setCookie, removeCookie] = useCookies()
    const nav = useNavigate()

    const auth = () => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentail) => {
                const uid = userCredentail.user.uid
                const db = getFirestore(app)
                setDoc(doc(db, 'users', login), {
                    uid: uid,
                    login: login,
                    surname: surname,
                    lastname: lastName,
                    email: email,
                    countFriends: 0,
                    friends: [],
                    chats: []
                })

                nav(`/profile/${login}`)
            })
            .catch((err) => {
                if (err.code === 'auth/email-already-in-use') {
                    setError('Такой пользователь уже существует')
                }
            })
    }

    return (
        <div className={cl.main}>
            <div className={cl.login}>
                <h1>Регистрация</h1>
                <Myinput value={surname} onChange={e => setSurName(e.target.value)} text={'Имя'} />
                <Myinput value={lastName} onChange={e => setLastName(e.target.value)} text={'Фамилия'} />
                <Myinput value={login} onChange={e => setLogin(e.target.value)} text={'Логин'} />
                <Myinput value={email} onChange={e => setEmail(e.target.value)} text={'Почта'} />
                <Myinput value={password} type={'password'} onChange={e => setPassword(e.target.value)} text={'Пароль'} />
                <Mybutton onClick={auth} id={'sign-in-button'} text={'Зарегистрироваться'}/>
                <p style={{color: 'red', textAlign: 'center'}}>{error}</p>
            </div>
        </div>
    );
};

export default Register;