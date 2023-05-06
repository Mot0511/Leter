import React, {useEffect, useState} from 'react';
import cl from './person.module.css'
import Mybutton from "../mybutton/mybutton";
import {Link} from "react-router-dom";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import initApp from "../../scripts/initApp";

const Person = ({lastname, login, surname, status}) => {
    const app = initApp()
    const [avatar, setAvatar] = useState()
    const storage = getStorage(app);
    useEffect(() => {
        getDownloadURL(ref(storage, login+'/avatar.png'))
            .then(url => {
                setAvatar(url)
            })

    }, [])
    return (
        <a href={`/profile/${login}`}><div className={cl.item}>
            <div className={cl.info}>
                <div className={cl.avatar} style={{backgroundImage: `url(${avatar})`}}></div>
                <p className={cl.name}>{surname} {lastname}</p>
                <p className={cl.login}>@{login}</p>
            </div>
            {/*<div className={cl.btns}>*/}
            {/*    {*/}
            {/*        status*/}
            {/*            ? <></>*/}
            {/*            : <Mybutton style={{width: '200px', height: '44px', marginTop: '3px', marginRight: '3px'}} text={'Добавить в друзья'}/>*/}
            {/*    }*/}
            {/*    <Mybutton style={{width: '110px', height: '44px', marginTop: '3px', marginRight: '3px'}} text={'Написать'}/>*/}
            {/*</div>*/}

        </div></a>
    );
};

export default Person;