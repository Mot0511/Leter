import React, {useEffect, useMemo, useState} from 'react';
import './profile.css'
import Mybutton from "../components/mybutton/mybutton";
import {useParams} from "react-router";
import {collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where} from "firebase/firestore";
import initApp from "../scripts/initApp";
import {useCookies} from "react-cookie";
import {useNavigate, Link} from "react-router-dom";
import Loading from '../components/loading/loading'
import friends from "../scripts/friends";
import createChat from "../scripts/createChat";
import Person from "../components/person2/person";
import { getStorage, ref, getDownloadURL, uploadBytes, listAll, deleteObject } from "firebase/storage";

import back from '../img/back.png'
import Requests from "../components/requests/requests";
import Myinput from "../components/myinput/myinput";

const Profile = (props) => {
    const app = initApp()
    const db = getFirestore(app)
    const storage = getStorage(app);

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
    if (!cookie.login) {
        console.log(1);
        nav('/login')
    }
    const [isVisible, setIsVisible] = useState(true)
    const [isAvatar, setIsAvatar] = useState(true)
    const [isRequests, setIsRequests] = useState(false)

    const [isEditing, setIsEditing] = useState(false)
    const [images, setImages] = useState([])
    const [isLoadingImages, setIsLoadingImages] = useState(true)

    const getImages = () => {
        setIsLoadingImages(true)
        listAll(ref(storage, login+'/img/'))
            .then((res) => {
                let images = []
                res.items.forEach((itemRef) => {
                    getDownloadURL(ref(storage, itemRef._location.path_))
                        .then(url => {
                            images.push(url)
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
                console.log(images)
                setImages(images)
                setIsLoadingImages(false)

            }).catch((error) => {
                console.log(error);
            });
    }

    const getAvatar = () => {
        setIsVisible(true)
        const avatarRef = ref(storage, login+'/avatar.png')
        getDownloadURL(avatarRef)
            .then(url => {
                // const xhr = new XMLHttpRequest()
                // xhr.responseType = 'blob'
                // xhr.onload = (event) => {
                //     const blob = xhr.response
                // }
                // xhr.open('GET', url)
                // xhr.send()
                setIsVisible(false)
                const img = document.getElementById('avatar')
                img.setAttribute('src', url)

            })
            .catch((error) => {
                console.log(error);
            });
    }

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


        getData()
        getAvatar()
        getImages()

    }, [])

    const saveEdits = async () => {
        await updateDoc(doc(db, 'users', login), {
            surname: surname,
            lastname: lastname,
        });

        setIsEditing(false)
    }

    const uploadAvatar = () => {
        const file = document.getElementById('avatarFile').files[0]
        uploadBytes(ref(storage, cookie.login+'/avatar.png'), file)
            .then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getAvatar()
            });

    }
    const uploadImage = () => {
        const file = document.getElementById('uploadImage').files[0]
        uploadBytes(ref(storage, cookie.login+'/img/'+file.name), file)
            .then((snapshot) => {
                window.location.reload()
            })
    }
    const removePhoto = (url) => {
        deleteObject(ref(storage, url))
            .then(() => {
                window.location.reload()
            }).catch(err => {

        })
    }
    return (
        <div className={''}>
            <div className={'profile'}>
                <div>
                    <img src="" className={'avatar'} id={'avatar'} alt=""/><br />
                    <input onChange={uploadAvatar} type="file" id={'avatarFile'} hidden/>
                    <input onChange={uploadImage} type="file" id={'uploadImage'} hidden/>
                    {
                        login === cookie.login
                            ? <Mybutton style={{width: '150px', height: '60px'}}><label for={"avatarFile"}>Изменить аватарку</label></Mybutton>
                            : <></>
                    }

                    {/*{*/}
                    {/*    isEditing*/}
                    {/*        ? */}
                    {/*        : <></>*/}
                    {/*}*/}
                    <Link to={`/friends/${login}`}><div className={'friends'}>
                        <p>{countFriends}</p>
                        <p>Друзей</p>
                    </div></Link>

                </div>
                <div className={'info'}>
                    <p>@{login}</p>
                    {
                        isVisible
                            ? <Loading />
                            : isEditing
                                ? <div style={{display: 'flex'}}>
                                    <Myinput text={'Имя'} style={{marginRight: '10px'}} value={surname} onChange={e => setSurname(e.target.value)} />
                                    <Myinput text={'Фамилия'} value={lastname} onChange={e => setLastname(e.target.value)} />
                                </div>
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
                            : <><Mybutton><label for={'uploadImage'}>Опубликовать фото</label></Mybutton>
                                {
                                    isEditing
                                        ? <Mybutton text={'Сохранить изменения'} onClick={saveEdits} />
                                        : <Mybutton text={'Изменить информацию'} onClick={() => setIsEditing(true)} />
                                }
                            </>
                    }



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
            {
                isLoadingImages
                    ? <Loading />
                    : <div className={'photos'}>
                        {
                            images.map(img => <div>
                                <div className={'photo'} style={{backgroundImage: `url(${img})`}}></div>
                                <Mybutton onClick={() => removePhoto(img)}>Удалить фото</Mybutton>
                            </div>)
                        }
                    </div>
            }

        </div>
    );
};

export default Profile;