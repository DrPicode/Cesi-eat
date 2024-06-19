import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage.jsx';
import ModifyPage from './components/ModifyPage.jsx';
import DeliveryPage from './components/DeliveryPage';
import Unauthorized from "./components/Unauthorized.jsx";
import Delivery1 from './components/Delivery1';
import Delivery2 from './components/Delivery2';
import { authProxyDelivery } from "./proxy/auth.proxy.js";
import { useSnapshot } from "valtio";

function App() {
    const authSnap = useSnapshot(authProxyDelivery);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/auth/token", {
                    credentials: "include"
                });
                if (response.ok) {
                    const body = await response.json();
                    if (body.accessToken) {
                        console.log("return from token api", body)
                        authProxyDelivery.token = body.accessToken;
                        authProxyDelivery.userId = body.userId;
                        setCurrentUser(authProxyDelivery);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        return () => {

        }
    }, []);

    return loading ? <p>Loading...</p> : (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={
                (() => {
                    if (currentUser) {
                        return (
                            <Routes>
                                <Route path="/home" element={<HomePage />} />
                                <Route path="/delivery2" element={<Delivery2 />} />
                                <Route path="/delivery1" element={<Delivery1 />} />
                                <Route path="/delivery" element={<DeliveryPage />} />
                                <Route path="/modify" element={<ModifyPage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                            </Routes>
                        )
                    } else {
                        return <Navigate to="/" />
                    }
                })()}
            />
        </Routes>
    );
}

export default App;
