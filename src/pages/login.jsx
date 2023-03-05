import React, {useState} from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {doc, getDoc, getFirestore} from 'firebase/firestore'
import cl from './login.module.css'
import Myinput from "../components/myinput/myinput";
import Mybutton from "../components/mybutton/mybutton";
import initApp from '../scripts/initApp'
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import { isVisible } from '@testing-library/user-event/dist/utils';
import Loading from '../components/loading/loading'

const Login = () => {
    const app = initApp()
    const [login, setLogin] = useState('Mot0511')
    const [email, setEmail] = useState('suvorov.matvej9@gmail.com')
    const [password, setPassword] = useState('motik0511')
    const [error, setError] = useState('')
    const [cookie, setCookie, removeCookie] = useCookies()
    const nav = useNavigate()
    const [isVisible, setIsVisible] = useState(false)

    const auth = async () => {
        setIsVisible(true)
        const auth = getAuth()
        const db = getFirestore(app)
        const user = await getDoc(doc(db, 'users', login))
        if (user.exists()){
            if (user.data().email === email){
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredentail) => {
                        {
                            setIsVisible(false)
                            setCookie('login', login)
                            nav(`/profile/${login}`)
                        }
                    })
                    .catch((err) => {
                        if (err.code === 'auth/wrong-password') {
                            setError('Неправильный пароль')
                        }
                    })

            }
        } else{
            setError('Такого пользователя не существует')
        }
    }

    return (
        <div className={cl.main}>
            <div className={cl.login}>
                <h1>Вход</h1>
                <Myinput value={login} onChange={e => setLogin(e.target.value)} text={'Логин'} />
                <Myinput value={email} onChange={e => setEmail(e.target.value)} text={'Почта'} />
                <Myinput value={password} type={'password'} onChange={e => setPassword(e.target.value)} text={'Пароль'} />
                <Mybutton onClick={auth} id={'sign-in-button'} text={
                    isVisible
                        ? <Loading />
                        : 'Войти'
                }/>
                <p style={{color: 'red', textAlign: 'center'}}>{error}</p>
            </div>

            
        </div>
    );
};

export default Login;