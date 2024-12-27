import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CommonMenu from '../CommonMenu/CommonMenu';
import RequestDeleteAccount from '../../modules/Patient/AccountManagement/DeleteAccount/RequestDeleteAccount/RequestDeleteAccount';
import PatientProfile from '../../modules/Patient/AccountManagement/PatientProfile/PatientProfile';
import './PatientMenu.css'; // Updated CSS file

function PatientMenu() {
    
    return (
        <div className="patient-container">
            {/* Left-side menu */}
            <nav className="patient-menu">
                <CommonMenu />
                <h2 className="patient-menu-header">Patient Menu</h2>
                <ul className="patient-menu-list">
                    <li>
                        <Link className="patient-menu-link" to="/patient/">Patient Dashboard</Link>
                    </li>
                    <li>
                        <Link className="patient-menu-link" to="/patient/patient-info">Patient Information</Link>
                    </li>
                    <li>
                        <Link className="patient-menu-link" to="/profile">User Profile</Link>
                    </li>
                    <li>
                        <Link className="patient-menu-link" to="/patient/request-delete-account">Request Delete Account</Link>
                    </li>
                </ul>
                <div className="patient-menu-logout">
                    <Link to="/logout" className="patient-menu-link">Logout</Link>
                </div>
            </nav>

            {/* Content area */}
            <div className="patient-content">
                <Routes>
                    <Route path="request-delete-account" element={<RequestDeleteAccount />} />
                    <Route path="patient-info" element={<PatientProfile />} />
                    <Route
                        path="*"
                        element={
                            <div className="welcome-container">
                                <h1 className="welcome-message">Welcome to the Patient Dashboard</h1>
                                <p className="welcome-description">
                                    Use the menu on the left to navigate your account and options.
                                </p>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default PatientMenu;
