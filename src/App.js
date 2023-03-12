import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Profile from "./pages/profile";
import './App.css'
import Menu from "./components/menu/menu";
import Login from "./pages/login";
import Register from "./pages/register";
import {useCookies} from "react-cookie";
import Friends from './pages/friends';
import Chats from "./pages/chats";

const App = () => {
    return (
        <BrowserRouter>
            <div className={'container-fluid main'} style={{minHeight: '100vh'}}>
                <div className={'row'} style={{minHeight: '100vh'}}>
                    <div className={'menu col-lg-2'} style={{minHeight: '100vh'}}>
                        <Menu />
                    </div>
                    <div className={'col-lg-10 content'}>

                            <Routes>
                                <Route path={'/'} element={<Profile />} />
                                <Route path={'/login/'} element={<Login />} />
                                <Route path={'/register'} element={<Register />} />
                                <Route path={'/profile/:login'} element={<Profile />} />
                                <Route path={'/friends/:login'} element={<Friends />} />
                                <Route path={'/chats/'} element={<Chats />} />
                            </Routes>

                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;