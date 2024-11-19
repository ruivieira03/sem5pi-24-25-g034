// src/modules/Auth/RequestPasswordReset.js

import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Reuse the existing styles

function RequestPasswordReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleRequestReset = async () => {
        try {
            const response = await axios.post('https://localhost:5001/api/account/request-password-reset', { email });
            setMessage(response.data.message);
            setError(null); // Clear any previous errors
        } catch (error) {
            setError(error.response?.data.message || 'An error occurred. Please try again.');
            setMessage(null); // Clear any previous messages
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Request Password Reset</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="input-field"
                />
                <button onClick={handleRequestReset} className="login-button">Send Reset Link</button>
            </div>
        </div>
    );
}

export default RequestPasswordReset;