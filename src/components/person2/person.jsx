import {React, useEffect, useState} from 'react';
import cl from './person.module.css'
import {Link} from "react-router-dom";
import initApp from "../../scripts/initApp";
import {getDownloadURL, getStorage, ref} from "firebase/storage";

const Person2 = ({lastname, login, surname, chatid, callback, btns, style}) => {
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
        <div className={cl.item} style={style}>
            <button onClick={() => callback(chatid)}>
                <div className={cl.info}>
                    <a href={`/profile/${login}`}><div className={cl.avatar} style={{backgroundImage: `url(${avatar})`}}></div></a>
                    <p className={cl.name}>{surname} {lastname}</p>
                    <p className={cl.login}>@{login}</p>
                </div>
            </button>
            <div className={cl.btns}>
                {btns}
            </div>
</div>

    );
};

export default Person2;