import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ProfilePage from './components/ProfilePage';
import ModifyPage from './components/ModifyPage';
import DeliveryPage from './components/DeliveryPage';
import HistoryPage from './components/HistoryPage';
import Delivery1 from './components/Delivery1';
import Delivery2 from './components/Delivery2';





function App() {
  return (
    <Routes>
      <Route path="/delivery2" element={<Delivery2 />} />
      <Route path="/delivery1" element={<Delivery1 />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/delivery" element={<DeliveryPage />} />
      <Route path="/modify" element={<ModifyPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
