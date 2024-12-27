// src/modules/Auth/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { API_BASE_URL } from '../../../config';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async () => {
        try {
            // Send the login request to the server
            const response = await axios.post(`${API_BASE_URL}/api/account/login`, { 
                username, 
                password 
            });

            // Store the JWT token and user role in localStorage
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userRole', response.data.role);

            // Redirect to the appropriate menu based on the user's role
            const userRole = response.data.role;
            switch (userRole) {
                case 'Admin':
                    navigate('/admin/AdminMenu'); // Admin Menu
                    break;
                case 'Doctor':
                    navigate('/doctor/DoctorMenu'); // Doctor menu
                    break;
                case 'Patient':
                    navigate('/patient/PatientMenu'); // Patient menu
                    break;
                default:
                    navigate('/'); // Default route if role is unrecognized
                    break;
            }

        } catch (error) {
            console.error("Error details:", error.response?.data || error.message);
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="input-field"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="input-field"
                />
                <button onClick={handleLogin} className="login-button">Login</button>
                <a href="/request-password-reset" className="reset-password">Forgot Password?</a>
            </div>
        </div>
    );
}

export default Login;