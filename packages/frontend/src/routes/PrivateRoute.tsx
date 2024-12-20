import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/helper';

const PrivateRoute: React.ComponentType<any> = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to={'/login'} />;
};

export default PrivateRoute;
