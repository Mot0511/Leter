import React, {useEffect, useMemo, useState} from 'react'
import cl from './friends.module.css'
import Person from "../components/person/person";
import {useParams} from "react-router";

import avatar from '../img/avatar.png'
import initApp from "../scripts/initApp";
import {doc, getDoc, getFirestore, getDocs, query, collection, where} from "firebase/firestore";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import Loading from "../components/loading/loading";

const Friends = () => {
    const app = initApp()
    const db = getFirestore(app)
    const login = useParams().login

    const [friends, setFriends] = useState([])
    const [info, setInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [cookie] = useCookies()
    const nav = useNavigate()

    useEffect(() => {
        if (!cookie.login) {
            nav('/login')
        }
    }, [])

    useMemo(() => {

        const getData = async () => {
            let friends = await getDoc(doc(db, 'users', login))
            friends = friends.data().friends
            if (!friends.length){
                setIsLoading(false)
                return
            }
            let temp = []
            console.log(1);
            let data = await getDocs(query(collection(db, 'users'), where('login', 'in', friends)))
            data.forEach(doc => {
                temp.push(doc.data())
            })
            setIsLoading(false)
            setInfo(temp)
            setFriends(friends)

        }
        getData()
    }, [])

    return (
        <div className={cl.friends}>
            <h2>Друзья</h2>
            <div className={cl.list}>
                {
                    isLoading
                        ? <Loading />
                        : friends.length
                            ? info.map(el => <Person login={el.login} surname={el.surname} lastname={el.lastname} key={Math.random()} />)
                            : <p>Друзья отсутствуют</p>

                }
            </div>
        </div>
    )
}

export default Friends