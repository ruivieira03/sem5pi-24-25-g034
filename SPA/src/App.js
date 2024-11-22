// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'; // Import Landing Page
import About from './components/About/About'; // Import About Page
import Login from './modules/Auth/Login/Login'; // Import Login
import Logout from './modules/Auth/Logout/Logout'; // Import Logout
import AdminMenu from './components/AdminMenu/AdminMenu'; // Admin Menu
import DoctorMenu from './components/DoctorMenu'; // Doctor Menu
import PatientMenu from './components/PatientMenu/PatientMenu'; // Patient Menu
import Profile from './modules/Auth/Profile/Profile'; // Import Profile
import PrivateRoute from './components/PrivateRoute'; // Protected Routes
import CommonMenu from './components/CommonMenu/CommonMenu'; // Common Menu
import PatientRegister from './modules/SystemUser/PatientRegister/PatientRegister'; // Patient Register
import RequestPasswordReset from './modules/Auth/ResetPassword/RequestPasswordReset'; // Request Password Reset
import ResetPassword from './modules/Auth/ResetPassword/ResetPassword'; // Reset Password
import UserList from './modules/Admin/UserManagement/UserList/UserList'; // User List
import UpdateUser from './modules/Admin/UserManagement/UpdateUser/UpdateUser'; // Update User
import RegisterUser from './modules/Admin/UserManagement/RegisterUser/RegisterUser'; // Register User
import RequestDeleteAccount from './modules/Patient/AccountManagement/DeleteAccount/RequestDeleteAccount/RequestDeleteAccount'; // Request Delete Account
import ConfirmDeleteAccount from './modules/Patient/AccountManagement/DeleteAccount/ConfirmDeleteAccount/ConfirmDeleteAccount'; // Confirm Delete Account
import PatientProfile from './modules/Patient/AccountManagement/PatientProfile/PatientProfile'; // Patient Profile
import ConfirmEmail from './modules/SystemUser/ConfirmEmail/ConfirmEmail'; // Confirm Email
import UserDetails from './modules/Admin/UserManagement/UserDetails/UserDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} /> {/* Landing page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/register-patient" element={<PatientRegister />} /> {/* Patient registration page */}
        <Route path="/request-password-reset" element={<RequestPasswordReset />} /> {/* Request Password Reset */}
        <Route path="/reset-password" element={<ResetPassword />} />  
        <Route path='/confirm-email' element={<ConfirmEmail />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected Routes */}
        {/*Admin Routes*/}
        <Route path="/admin/*" element={<PrivateRoute role="Admin" element={<AdminMenu />} />} />

        {/* Nested Routes for Admin */}
        <Route path="user-list" element={<UserList />} />
        <Route path="user-details/:id" element={<UserDetails />} />
          <Route path="update-user/:id" element={<UpdateUser />} />
        <Route path="register-user" element={<RegisterUser />} />

        {/*Patient Routes*/}
        <Route path="/patient/*" element={<PrivateRoute role="Patient" element={<PatientMenu />} />} />

        {/* Nested Routes for Patient */}
        <Route path="request-delete-account" element={<RequestDeleteAccount />} />
          <Route path="delete-account" element={<ConfirmDeleteAccount />} />
        <Route path="patient-info" element={<PatientProfile />} />
       
        {/*Doctor Routes*/}
        <Route path="/doctor/*" element={<PrivateRoute role="Doctor" element={<DoctorMenu />} />} />
        
        {/*Global Routes*/}
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/register-patient" element={<PatientRegister />} />
        
        {/* Default Route for Home */}
        <Route path="/" element={<CommonMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
