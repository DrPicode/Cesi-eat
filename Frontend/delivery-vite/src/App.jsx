import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import ModifyPage from './components/ModifyPage.jsx';
import DeliveryPage from './components/DeliveryPage';
import HistoryPage from './components/HistoryPage';
import WelcomePage from "./components/WelcomePage.jsx";
import Delivery1 from './components/Delivery1';
import Delivery2 from './components/Delivery2';
import {authProxyDelivery} from "./proxy/auth.proxy.js";
import {useSnapshot} from "valtio";





function App() {
    const authSnap = useSnapshot(authProxyDelivery);

    useEffect( () => {
        const fetchData = async ()  => {
            const response = await fetch("/api/auth/token", {
                credentials: "include"
            });
            if (response.ok) {
                const body = await response.json();
                console.log({body})
                if (body.accessToken) {
                    authProxyDelivery.token = body.accessToken;
                }
            }
        }
        fetchData();
        return () => {

        }
    }, []);
    return (
        <Routes>
            <Route path="/delivery2" element={<Delivery2 />} />
            <Route path="/delivery1" element={<Delivery1 />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/" element={<WelcomePage />} />
            <Route path="/modify" element={<ModifyPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
        </Routes>
    );
}

export default App;
