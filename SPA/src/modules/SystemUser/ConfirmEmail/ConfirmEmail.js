import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../config'; // Import API_BASE_URL
import './ConfirmEmail.css';

function ConfirmEmail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailParam = queryParams.get('email');
        const tokenParam = queryParams.get('token');

        if (emailParam && tokenParam) {
            setEmail(emailParam);
            setToken(tokenParam);
        } else {
            alert('Email or token is missing.');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }, [location, navigate]);

    const handleConfirmEmail = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/account/confirm-email?email=${email}&token=${token}` // Use API_BASE_URL here
            );
            setMessage(response.data.message || 'Email confirmed successfully.');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="confirm-email-container">
            <h3>Confirm Email Address</h3>
            <p>Are you sure you want to confirm your email address?</p>
            <div className="confirm-email-buttons">
                <button onClick={handleConfirmEmail} className="confirm-button">
                    Yes, Confirm My Email
                </button>
                <button
                    onClick={() => alert('Email confirmation canceled.')}
                    className="cancel-button"
                >
                    Cancel
                </button>
            </div>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default ConfirmEmail;
