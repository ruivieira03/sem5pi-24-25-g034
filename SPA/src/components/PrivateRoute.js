// Desc: PrivateRoute component to check if user is logged in and has the correct role

import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ element, role }) {
  const userRole = localStorage.getItem('userRole');
  const authToken = localStorage.getItem('authToken');

  // If no token or incorrect role, redirect to login
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    return <Navigate to="/" />; // Redirect to home if the role doesn't match
  }

  return element;
}

export default PrivateRoute;
