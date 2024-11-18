import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ConfirmEmail.css'; // Import the CSS file

function ConfirmEmail() {
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate to programmatically navigate
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
                navigate('/'); // Redirect to home after 3 seconds
            }, 3000);
        }
    }, [location, navigate]);

    const handleConfirmEmail = async () => {
        try {
            const response = await axios.get(`https://localhost:5001/api/account/confirm-email?email=${email}&token=${token}`);

            // Display the success message
            setMessage(response.data.message || 'Email confirmed successfully.');

            // Redirect to the landing page
            setTimeout(() => {
                navigate('/');
            }, 3000); // Wait for 3 seconds before redirecting 
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="confirm-email-container">
            <h3>Confirm Email Address</h3>
            <p>Are you sure you want to confirm your email address?</p>
            <div className="confirm-email-buttons">
                <button onClick={handleConfirmEmail} className="confirm-button">Yes, Confirm My Email</button>
                <button onClick={() => alert('Email confirmation canceled.')} className="cancel-button">Cancel</button>
            </div>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default ConfirmEmail;