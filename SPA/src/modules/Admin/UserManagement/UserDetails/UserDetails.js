import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config';
import './UserDetails.css'; // Import CSS file for styling

function UserDetails() {
    const [userUsername, setUserId] = useState(''); // State for user ID input
    const [userData, setUserData] = useState(null); // State for fetched user data
    const [error, setError] = useState(''); // State for error messages

    const fetchUser = async () => {
        setError(''); // Clear any previous error
        setUserData(null); // Clear previous user data

        if (!userUsername) {
            setError('Please provide a valid username.');
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/api/SystemUser/username/${userUsername}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Add token for authentication
                },
            });
            setUserData(response.data); // Set the fetched user data
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('User not found.');
            } else {
                setError('An error occurred while fetching user details.');
            }
        }
    };

    return (
        <div className="user-details-container">
            <h2>Get User Details</h2>

            <div className="input-section">
                <label htmlFor="userUsername">Username:</label>
                <input
                    type="text"
                    id="userUsername"
                    value={userUsername}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter Username"
                />
                <button onClick={fetchUser}>Fetch User</button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {userData && (
                <div className="user-details">
                    <h3>User Details</h3>
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Role:</strong> {userData.role}</p>
                    <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
                </div>
            )}
        </div>
    );
}

export default UserDetails;
