import React, {useEffect} from 'react';
import cl from './menu.module.css'
import Mybutton from "../mybutton/mybutton";
import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {getAuth, signOut} from "firebase/auth";
import login from "../../pages/login";

const Menu = () => {
    const [cookie, setCookie, removeCookie] = useCookies()
    const nav = useNavigate()
    useEffect(() => {

    }, [])
    const exit = () => {
        const auth = getAuth()
        signOut(auth)
            .then(() => {
                removeCookie('login')
                nav('/login')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className={cl.menu}>
            {
                cookie.login
                    ? <Link to={`/profile/${cookie.login}`}><Mybutton text={'Профиль'} /></Link>
                    : <Link to={`/login`}><Mybutton text={'Профиль'} /></Link>
            }

            <Link to={`/chats/${cookie.login}`}><Mybutton text={'Сообщения'} /></Link>
            <Link to={`/friends/${cookie.login}`}><Mybutton text={'Друзья'} /></Link>
            <div className={cl.bottom}>
                {
                    cookie.login
                        ? <Mybutton style={{marginTop: '50px'}} onClick={exit} text={'Выйти'} />
                        : <div>
                            <Link to={'/login'}><Mybutton text={'Войти'} /></Link>
                            <Link to={'/register'}><Mybutton text={'Регистрация'} /></Link>
                        </div>
                }
</div>
        </div>
    );
};

export default Menu;