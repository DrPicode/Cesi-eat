import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import HomePage from './components/HomePage.jsx';
import ProductsPage from './components/ProductsPage.jsx';
import OrdersPage from './components/OrdersPage.jsx';
import AddProductPage from './components/AddProductPage.jsx';
import UpdateProductPage from './components/UpdateProductPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import RestaurantInfoPage from './components/RestaurantInfoPage.jsx';


function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/update-product/:productId" element={<UpdateProductPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/restaurant-info" element={<RestaurantInfoPage />} />
        </Routes>
    );
}

export default App;
