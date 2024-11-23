// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Import Landing Page
import Login from './modules/Auth/Login';
import Logout from './modules/Auth/Logout';
import AdminMenu from './components/AdminMenu'; // Admin Menu
import DoctorMenu from './components/DoctorMenu'; // Doctor Menu
import PatientMenu from './components/PatientMenu'; // Patient Menu
import Profile from './modules/Auth/Profile'; // Import Profile
import PrivateRoute from './components/PrivateRoute'; // Protected Routes
import CommonMenu from './components/CommonMenu'; // Common Menu
import PatientRegister from './modules/SystemUser/PatientRegister'; // Patient Register
import RequestPasswordReset from './modules/Auth/RequestPasswordRequest'; // Request Password Reset
import ResetPassword from './modules/Auth/ResetPassword'; // Reset Password
import UserList from './modules/Admin/UserList'; // User List
import UpdateUser from './modules/Admin/UpdateUser'; // Update User
import RegisterUser from './modules/Admin/RegisterUser'; // Register User
import RequestDeleteAccount from './modules/Patient/RequestDeleteAccount'; // Request Delete Account
import ConfirmDeleteAccount from './modules/Patient/ConfirmDeleteAccount'; // Confirm Delete Account
import PatientProfile from './modules/Patient/PatientProfile';
import ConfirmEmail from './modules/SystemUser/ConfirmEmail';
import OperationRequestList from './modules/OperationRequest/OperationRequestList';


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
        <Route path="update-user/:id" element={<UpdateUser />} />
        <Route path="register-user" element={<RegisterUser />} />
        <Route path="operation-requests" element={<OperationRequestList />} />

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
