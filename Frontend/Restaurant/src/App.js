import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import OrdersPage from './components/OrdersPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  );
};

export default App;
