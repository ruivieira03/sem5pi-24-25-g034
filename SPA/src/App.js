import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import About from './components/About/About'; 
import Login from './modules/Auth/Login/Login';
import Logout from './modules/Auth/Logout/Logout';
import AdminMenu from './components/AdminMenu/AdminMenu';
import DoctorMenu from './components/DoctorMenu/DoctorMenu';
import PatientMenu from './components/PatientMenu/PatientMenu';
import Profile from './modules/Auth/Profile/Profile';
import PrivateRoute from './components/PrivateRoute';
import CommonMenu from './components/CommonMenu/CommonMenu';
import PatientRegister from './modules/SystemUser/PatientRegister/PatientRegister';
import RequestPasswordReset from './modules/Auth/ResetPassword/RequestPasswordReset';
import ResetPassword from './modules/Auth/ResetPassword/ResetPassword';
import UserList from './modules/Admin/UserManagement/UserList/UserList';
import UpdateUser from './modules/Admin/UserManagement/UpdateUser/UpdateUser';
import RegisterUser from './modules/Admin/UserManagement/RegisterUser/RegisterUser';
import RequestDeleteAccount from './modules/Patient/AccountManagement/DeleteAccount/RequestDeleteAccount/RequestDeleteAccount';
import ConfirmDeleteAccount from './modules/Patient/AccountManagement/DeleteAccount/ConfirmDeleteAccount/ConfirmDeleteAccount';
import PatientProfile from './modules/Patient/AccountManagement/PatientProfile/PatientProfile';
import ConfirmEmail from './modules/SystemUser/ConfirmEmail/ConfirmEmail';
import UserDetails from './modules/Admin/UserManagement/UserDetails/UserDetails';
import OperationRequestList from './modules/OperationRequest/OperationRequestList/OperationRequestList';
import SceneComponent from './3d_module/components/Scene/SceneComponent.tsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-patient" element={<PatientRegister />} />
        <Route path="/request-password-reset" element={<RequestPasswordReset />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected Routes */}
        {/* Admin Routes */}
        <Route path="/admin/*" element={<PrivateRoute role="Admin" element={<AdminMenu />} />} />
        <Route path="user-list" element={<UserList />} />
        <Route path="user-details/:id" element={<UserDetails />} />
        <Route path="update-user/:id" element={<UpdateUser />} />
        <Route path="register-user" element={<RegisterUser />} />
        <Route path="operation-requests" element={<OperationRequestList />} />

        {/* Patient Routes */}
        <Route path="/patient/*" element={<PrivateRoute role="Patient" element={<PatientMenu />} />} />
        <Route path="request-delete-account" element={<RequestDeleteAccount />} />
        <Route path="delete-account" element={<ConfirmDeleteAccount />} />
        <Route path="patient-info" element={<PatientProfile />} />

        {/* Doctor Routes */}
        <Route path="/doctor/*" element={<PrivateRoute role="Doctor" element={<DoctorMenu />} />} />

        {/* Global Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/register-patient" element={<PatientRegister />} />

        {/* 3D Module Route */}
        <Route path="/3d-module" element={<SceneComponent />} />

        {/* Default Route */}
        <Route path="/" element={<CommonMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
