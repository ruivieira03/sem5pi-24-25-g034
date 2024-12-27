import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../../../config'; // Import API_BASE_URL
import './ConfirmDeleteAccount.css';

function ConfirmDeleteAccount() {
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
                navigate('/'); // Redirect to home after 3 seconds
            }, 3000);
        }
    }, [location, navigate]);

    const handleConfirmDelete = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/account/delete-account?email=${email}&token=${token}` // Use API_BASE_URL here
            );

            setMessage(response.data.message || 'Account deleted successfully.');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while confirming account deletion.');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    };

    return (
        <div className="confirm-delete-container">
            <div className="confirm-delete-card">
                <h2>Confirm Account Deletion</h2>
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                <div className="confirm-delete-buttons">
                    <button onClick={handleConfirmDelete} className="confirm-button">
                        Yes, Delete My Account
                    </button>
                    <button
                        onClick={() => {
                            alert('Account deletion canceled.');
                            navigate('/');
                        }}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                </div>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

export default ConfirmDeleteAccount;
