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
import MobileMenu from "./components/mobileMenu/mobileMenu";
import Footer from "./components/footer/footer";

const App = () => {
    return (
        <BrowserRouter>
            <MobileMenu/>
            <div className={'container-fluid main'} style={{minHeight: '100vh'}}>
                <div className={'row'} style={{minHeight: '100vh'}}>
                    <div className={'menu col-lg-2 leftColumn'}>
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
            <Footer />
        </BrowserRouter>
    );
};

export default App;