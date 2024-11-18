// src/components/PatientMenu.js

import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CommonMenu from './CommonMenu'; // Assuming you have a CommonMenu component
import RequestDeleteAccount from '../modules/Patient/RequestDeleteAccount'; // Adjust the import path as necessary
import PatientProfile from '../modules/Patient/PatientProfile';
import './PatientMenu.css'; // CSS file for styling

function PatientMenu() {
    return (
        <div className="patient-menu-container">
            <CommonMenu />
            <h2 className="patient-menu-header">Patient Menu</h2>

            <ul className="patient-menu-list">
                <li><Link className="patient-menu-link" to="/patient/patient-info">Patient Information</Link></li>
                <li><Link className="patient-menu-link" to="/profile">User Profile</Link></li>
                <li><Link className="patient-menu-link" to="/patient/request-delete-account">Request Delete Account</Link></li>
            </ul>

            <div className="patient-menu-logout">
                <Link to="/logout">Logout</Link>
            </div>

            <Routes>
                <Route path="request-delete-account" element={<RequestDeleteAccount />} />
                <Route path="patient-info" element={<PatientProfile />} />
            </Routes>
        </div>
    );
}

export default PatientMenu;