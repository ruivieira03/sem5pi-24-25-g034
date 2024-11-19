// src/components/RequestDeleteAccount.js

import React, { useState } from 'react';
import axios from 'axios';
import './RequestDeleteAccount.css'; // Import the CSS file

function RequestDeleteAccount() {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleRequestDeleteAccount = async () => {
        const token = localStorage.getItem('authToken');
        console.log('Token:', token);  // Debugging log

        if (!token) {
            setError('No token found. Please log in.');
            return;
        }
    
        try {
            const response = await axios.get('https://localhost:5001/api/account/request-delete-account', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage(response.data.message);
            setError(null); // Clear any previous errors
        } catch (error) {
            setError(error.response?.data.message || 'An error occurred. Please try again.');
            setMessage(null); // Clear any previous messages
        }
    };

    return (
        <div className="request-delete-container">
            <div className="request-delete-form">
                <h2>Request Account Deletion</h2>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <p>Click the button below to request account deletion. A confirmation email will be sent to you.</p>
                <button onClick={handleRequestDeleteAccount} className="request-delete-button">Request Delete Account</button>
            </div>
        </div>
    );
}

export default RequestDeleteAccount;