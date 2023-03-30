import React from 'react';
import back from "../../img/back.png";
import Person from "../person2/person";
import Mybutton from "../mybutton/mybutton";
import friends from "../../scripts/friends";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import cl from './requests.module.css'

const Requests = ({requests, setRequests, setIsRequests}) => {
    const [cookie, setCookie, removeCookie] = useCookies()
    const nav = useNavigate()

    return (
        <div className={'requests'}>
            <div>
                {
                    window.innerWidth <= 920
                        ? <Mybutton style={{width: '50px'}} onClick={() => setIsRequests(false)}><img src={back} width={'30px'} height={'30px'} alt=""/></Mybutton>
                        : <></>

                }
                <h3>Запросы в друзья</h3>
            </div>

            <hr/>
            {
                requests.map(req => <Person login={req[0]} surname={req[1]} lastname={req[2]} callback={() => {nav(`/profile/${req[0]}`)} }
                                            btns={<Mybutton onClick={() => friends(cookie.login, req[0], 'addFriend', res => {
                                                setRequests(res)
                                            })} style={{width: 'auto', height: '44px', marginTop: '3px', marginRight: '3px'}} text={'✔'}/>}
                />)
            }

        </div>
    );
};

export default Requests;