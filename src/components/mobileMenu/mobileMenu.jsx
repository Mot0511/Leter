import React, {useEffect} from 'react';
import cl from './mobileMenu.module.css'

import profile from '../../img/profile.png'
import chat from '../../img/chat.png'
import friends from '../../img/friends.png'
import logout from '../../img/logout.png'
import login from '../../img/login.png'
import register from '../../img/register.png'
import {useCookies} from "react-cookie";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";

const MobileMenu = () => {
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
        <div className={cl.mobileMenu}>
            {
                cookie.login
                    ? <>
                        <div className={cl.item}>
                            <Link to={`/profile/${cookie.login}`}><img src={profile} alt=""/></Link>
                        </div>
                        <div className={cl.item}>
                            <Link to={`/chats/`}><img src={chat} alt=""/></Link>
                        </div>
                        <div className={cl.item}>
                            <Link to={`/friends/${cookie.login}`}><img src={friends} alt=""/></Link>
                        </div>
                        <div className={cl.logout}>
                            <img onClick={exit} src={logout} alt=""/>
                        </div>

                    </>
                    : <>
                        <div className={cl.item}>
                            <Link to={'/login'}><img src={login} alt=""/></Link>
                        </div>
                        <div className={cl.item}>
                            <Link to={'/register'}><img src={register} alt=""/></Link>
                        </div>
                    </>
            }

        </div>
    );
};

export default MobileMenu;