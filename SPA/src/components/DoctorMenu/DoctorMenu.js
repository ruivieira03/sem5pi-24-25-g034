import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CommonMenu from '../CommonMenu/CommonMenu';
import OperationRequestList from '../../modules/OperationRequest/OperationRequestList/OperationRequestList';
import OperationRequestCreate from '../../modules/OperationRequest/OperationRequestCreate/OperationRequestCreate';
import OperationRequestByPatient from '../../modules/OperationRequest/OperationRequestByPatient/OperationRequestByPatient';
import OperationRequestByType from '../../modules/OperationRequest/OperationRequestByType/OperationRequestByType';
import OperationRequestByPriority from '../../modules/OperationRequest/OperationRequestByPriority/OperationRequestByPriority';
import ManageAllergies from '../../modules/Allergies/ManageAllergiesAsDoctor';
import './DoctorMenu.css';

function DoctorMenu() {
    return (
        <div className="doctor-container">
            {/* Left-side menu */}
            <nav className="doctor-menu">
                <CommonMenu />
                <h2 className="doctor-menu-header">Doctor Menu</h2>
                <ul className="doctor-menu-list">
                    <li>
                        <Link className="doctor-menu-link" to="/doctor">Doctor Initial Page</Link>
                    </li>
                    <li>
                        <Link className="doctor-menu-link" to="/doctor/allergies">View Allergies</Link>
                    </li>
                    <li>
                        <Link className="doctor-menu-link" to="/doctor/operation-requests">All Operation Requests</Link>
                    </li>
                    <li>
                        <Link className="doctor-menu-link" to="/doctor/operation-request-by-patient">Operation Request by Patient</Link>
                    </li>
                    <li>
                        <Link className="doctor-menu-link" to="/doctor/operation-request-by-type">Operation Request by Type</Link>
                    </li>
                    <li>
                        <Link className="doctor-menu-link" to="/doctor/operation-request-by-priority">Operation Request by Priority</Link>
                    </li>
                    <li>
                        <Link className="doctor-menu-link" to="/doctor/operation-request-create">Create Operation Request</Link>
                    </li>
                </ul>
                <div className="doctor-menu-logout">
                    <Link to="/logout" className="doctor-menu-link">Logout</Link>
                </div>
            </nav>

            {/* Content area */}
            <div className="doctor-content">
                <Routes>
                    <Route path="allergies" element={<ManageAllergies />} /> {/* Allergies route */}
                    <Route path="operation-requests" element={<OperationRequestList />} />
                    <Route path="operation-request-by-patient" element={<OperationRequestByPatient />} />
                    <Route path="operation-request-by-type" element={<OperationRequestByType />} />
                    <Route path="operation-request-by-priority" element={<OperationRequestByPriority />} />
                    <Route path="operation-request-create" element={<OperationRequestCreate />} />
                    <Route
                        path="*"
                        element={
                            <div className="welcome-container">
                                <h1 className="welcome-message">Welcome to Doctor Panel</h1>
                                <p className="welcome-description">
                                    Use the menu on the left to navigate through doctor-specific functions.
                                </p>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default DoctorMenu;
