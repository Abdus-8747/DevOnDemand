import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

// Simple admin auth using localStorage for demo purposes
const isAdminAuthenticated = () => {
  return localStorage.getItem('isAdmin') === 'true';
};

const RequireAdminAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default RequireAdminAuth;
