import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import './RequestPasswordReset.css';

function RequestPasswordReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleRequestReset = async () => {
        if (!email.trim()) {
            setError('Email is required.');
            setMessage(null);
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/account/request-password-reset`, // Use API_BASE_URL here
                { email }
            );
            setMessage(response.data.message || 'Password reset link sent!');
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
            setMessage(null);
        }
    };

    return (
        <div className="request-reset-container">
            <div className="request-reset-form">
                <h2>Request Password Reset</h2>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="input-field"
                />
                <button onClick={handleRequestReset} className="request-button">Send Reset Link</button>
            </div>
        </div>
    );
}

export default RequestPasswordReset;
