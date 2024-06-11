import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import OrdersPage from './components/OrdersPage';
import AddProductPage from './components/AddProductPage';
import UpdateProductPage from './components/UpdateProductPage';
import SignUpPage from './components/SignUpPage';
import RestaurantInfoPage from './components/RestaurantInfoPage';


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
