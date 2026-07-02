import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import Perfil from '../pages/Perfil';
import HotelDetail from '../pages/HotelDetail';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../components/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminHotelesList from '../pages/admin/AdminHotelesList';
import AdminHotelForm from '../pages/admin/AdminHotelForm';
import AdminHabitaciones from '../pages/admin/AdminHabitaciones';
import AdminReservasList from '../pages/admin/AdminReservasList';
import Configuracion from '../pages/Configuracion';
import Hoteles from '../pages/Hoteles';
import Destinos from '../pages/Destinos';
import Ofertas from '../pages/Ofertas';
import ResultadosBusqueda from '../pages/ResultadosBusqueda';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/hotel/:id" element={<HotelDetail />} />
      
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/hoteles" element={<Hoteles />} />
      <Route path="/destinos" element={<Destinos />} />
      <Route path="/ofertas" element={<Ofertas />} />
      <Route path="/resultados" element={<ResultadosBusqueda />} />
      
      {/* Protected Routes (Any logged in user) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/hoteles" element={<AdminHotelesList />} />
          <Route path="/admin/hoteles/nuevo" element={<AdminHotelForm />} />
          <Route path="/admin/hoteles/editar/:id" element={<AdminHotelForm />} />
          <Route path="/admin/habitaciones" element={<AdminHabitaciones />} />
          <Route path="/admin/reservas" element={<AdminReservasList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
