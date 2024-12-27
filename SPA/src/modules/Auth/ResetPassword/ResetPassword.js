import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';
import './ResetPassword.css';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        setMessage('');
        setError('');

        if (password.trim() === '' || confirmPassword.trim() === '') {
            setError('Please fill out all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get('email');
        const token = queryParams.get('token');

        if (!email || !token) {
            setError('Missing email or token in the link.');
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/account/reset-password?email=${email}&token=${token}`, // Use API_BASE_URL here
                { password }
            );

            setMessage(response.data.message || 'Password reset successful. You can now log in.');

            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="reset-container">
            <div className="reset-form">
                <h2>Reset Your Password</h2>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                />
                <button onClick={handleResetPassword} className="reset-button">
                    Reset Password
                </button>
            </div>
        </div>
    );
}

export default ResetPassword;
