import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import Perfil from '../pages/Perfil';
import HotelDetail from '../pages/HotelDetail';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/hotel/:id" element={<HotelDetail />} />
      
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected Routes (Any logged in user) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
