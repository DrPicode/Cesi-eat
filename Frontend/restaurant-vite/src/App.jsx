import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import HomePage from './components/HomePage.jsx';
import ProductsPage from './components/ProductsPage.jsx';
import OrdersPage from './components/OrdersPage.jsx';
import AddProductPage from './components/AddProductPage.jsx';
import UpdateProductPage from './components/UpdateProductPage.jsx';
import RestaurantInfoPage from './components/RestaurantInfoPage.jsx';
import { authProxyRestaurant } from "./proxy/auth.proxy.js";
import { useSnapshot } from "valtio";

function App() {
    const authSnap = useSnapshot(authProxyRestaurant);
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
                        authProxyRestaurant.token = body.accessToken;
                        authProxyRestaurant.userId = body.userId;
                        setCurrentUser(authProxyRestaurant);
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
            <Route path="*" element={
                (() => {
                    if (currentUser) {
                        return (
                            <Routes>
                                <Route path="/home" element={<HomePage />} />
                                <Route path="/products" element={<ProductsPage />} />
                                <Route path="/orders" element={<OrdersPage />} />
                                <Route path="*" element={<h1>404 - Page not found</h1>} />
                                <Route path="/add-product" element={<AddProductPage />} />
                                <Route path="/update-product/:productId" element={<UpdateProductPage />} />
                                <Route path="/restaurant-info" element={<RestaurantInfoPage />} />
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
