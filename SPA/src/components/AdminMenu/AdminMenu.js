import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CommonMenu from '../CommonMenu/CommonMenu';
import UserList from '../../modules/Admin/UserManagement/UserList/UserList';
import RegisterUser from '../../modules/Admin/UserManagement/RegisterUser/RegisterUser';
import RegisterPatientProfile from '../../modules/Admin/Patient-Profile-Management/RegisterPatientProfile/RegisterPatientProfile';
import PatientProfileList from '../../modules/Admin/Patient-Profile-Management/PatientProfilesList/PatientProfileList';
import PatientProfileDetails from '../../modules/Admin/Patient-Profile-Management/PatientProfileDetails/PatientProfileDetails';
import Profile from '../../modules/Auth/Profile/Profile';
import UserDetails from '../../modules/Admin/UserManagement/UserDetails/UserDetails';
import OperationRequestList from '../../modules/OperationRequest/OperationRequestList/OperationRequestList';
import OperationRequestCreate from '../../modules/OperationRequest/OperationRequestCreate/OperationRequestCreate';
import OperationRequestByPatient from '../../modules/OperationRequest/OperationRequestByPatient/OperationRequestByPatient';
import OperationRequestByType from '../../modules/OperationRequest/OperationRequestByType/OperationRequestByType';
import OperationRequestByPriority from '../../modules/OperationRequest/OperationRequestByPriority/OperationRequestByPriority';
import ManageAllergies from '../../modules/Allergies/ManageAllergiesAsAdmin';
import ManageSpecializations from '../../modules/Specializations/ManageSpecializationsAsAdmin';
import ManageMedicalCondition from '../../modules/MedicalCondition/ManageMedicalConditionAsAdmin';
import './AdminMenu.css'; // Import new CSS file for styling

function AdminMenu() {
    return (
        <div className="admin-container">
            {/* Left-side menu */}
            <nav className="admin-menu">
                <CommonMenu />
                <h2 className="admin-menu-header">Admin Menu</h2>
                <ul className="admin-menu-list">
                    <li>
                        <Link className="admin-menu-link" to="/admin">Admin Initial Page </Link>
                    </li>

                    <li>
                        <Link className="admin-menu-link" to="/admin/register-user">Register User</Link>
                    </li>

                    <li>
                        <Link className="admin-menu-link" to="register-Patient-Profile">Register Patient Profile</Link>
                    </li>

                    <li>
                        <Link className="admin-menu-link" to="/admin/user-list">User List</Link>
                    </li>
                    <li>
                        <Link className="admin-menu-link" to="Patient-Profile-list">All Patient Profiles</Link>
                        
                    </li>
                    <li>
                        <Link className="admin-menu-link" to="patient-profile-details">Patient Profile Information</Link>
                    </li>
                    <li>
                        <Link className="admin-menu-link" to="user-details/:username">User Information</Link>
                    </li>
                    <li>
                        <Link className="admin-menu-link" to="profile">Profile</Link>
                    </li>
                    <li>
                        <Link className="admin-menu-link" to="allergies">Allergies</Link>
                    </li>
                    <li>
                        <Link className="admin-menu-link" to="specializations">Specializations</Link>
                    </li>
                    <li>
                        <Link className="admin-menu-link" to="medicalCondition">Medical Condition</Link>
                    </li>
                    <li>
                        <Link className="admin-menu-link" to="/admin/operation-requests">All Operation Requests</Link>
                    </li>

                    <li>
                        <Link className="admin-menu-link" to="/admin/operation-request-by-patient">Operation Request by Patient</Link>
                    </li>
                    <li>
                        <Link className="admin-menu-link" to="/admin/operation-request-by-type">Operation Request by Type</Link>
                    </li>
                    <li>
                        <Link className="admin-menu-link" to="/admin/operation-request-by-priority">Operation Request by Priority</Link>
                    </li>
                    <li>
                        <Link className="admin-menu-link" to="/admin/operation-request-create">Create Operation Request</Link>
                    </li>
                </ul>
                <div className="admin-menu-logout">
                    <Link to="/logout" className="admin-menu-link">Logout</Link>
                </div>
            </nav>

            {/* Content area */}
            <div className="admin-content">
                <Routes>
                    <Route path="user-list" element={<UserList />} />
                    <Route path="user-details/:id" element={<UserDetails />} />
                    <Route path="register-user" element={<RegisterUser />} />
                    <Route path="register-Patient-Profile" element={<RegisterPatientProfile />} />
                    <Route path="Patient-Profile-list" element={<PatientProfileList />} />
                    <Route path="Patient-Profile-details" element={<PatientProfileDetails />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="allergies" element={<ManageAllergies />} />
                    <Route path="specializations" element={<ManageSpecializations />} />
                    <Route path="MedicalCondition" element={<ManageMedicalCondition />} />
                    <Route path="operation-requests" element={<OperationRequestList />} />
                    <Route path="operation-request-by-patient" element={<OperationRequestByPatient />} />
                    <Route path="operation-request-by-type" element={<OperationRequestByType />} />
                    <Route path="operation-request-by-priority" element={<OperationRequestByPriority />} />
                    <Route path="operation-request-create" element={<OperationRequestCreate />} />
                    <Route
                        path="*"
                        element={
                            <div className="welcome-container">
                                <h1 className="welcome-message">Welcome to Admin Panel</h1>
                                <p className="welcome-description">
                                    Use the menu on the left to navigate through administrative functions.
                                </p>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default AdminMenu;