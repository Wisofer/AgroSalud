// AuthRoutes.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAgroSalud } from './AgroSaludContext';

export const ProtectedRoute = ({ children }) => {
  const { usuario, loading } = useAgroSalud();

  if (loading) {
    return <div>Cargando...</div>; // Puedes reemplazar esto con un spinner o componente de carga
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const AuthRoute = ({ children }) => {
  const { usuario, loading } = useAgroSalud();

  if (loading) {
    return <div>Cargando...</div>; // Puedes reemplazar esto con un spinner o componente de carga
  }

  if (usuario) {
    return <Navigate to="/" replace />;
  }

  return children;
};
