import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminMenu from './AdminMenu';
import DoctorMenu from './DoctorMenu';
import NurseMenu from './NurseMenu';
import TechnicianMenu from './TechnicianMenu';
import PatientMenu from './PatientMenu';
import CommonMenu from './CommonMenu';

function Menu() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    // Remove the JWT token and user role from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');

    // Redirect to the login page after logout
    navigate('/login');
  };

  return (
    <div>
      <h2>Application Menu</h2>
      <CommonMenu /> {/* Common items for all users */}

      {/* Conditionally render based on user role */}
      {userRole === 'Admin' && <AdminMenu />}
      {userRole === 'Doctor' && <DoctorMenu />}
      {userRole === 'Patient' && <PatientMenu />}

      {/* Show login/logout based on authentication status */}
      {userRole ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default Menu;
