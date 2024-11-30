import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config';
import './PatientProfileDetails.css'; // Import CSS file for styling

function PatientProfileDetails() {
    const [userUsername, setUserId] = useState(''); // State for user ID input
    const [PatientProfileData, setUserData] = useState(null); // State for fetched user data
    const [error, setError] = useState(''); // State for error messages

    const fetchPatient = async () => {
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
        <div className="patient-profile-details-container">
            <h2>Get Patient Profile Details</h2>

            <div className="input-section">
                <label htmlFor="userUsername">Username:</label>
                <input
                    type="text"
                    id="userUsername"
                    value={userUsername}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter Email or Phone Number"
                />
                <button onClick={fetchPatient}>Fetch Patient Profile</button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {PatientProfileData && (
                <div className="user-details">
                    <h3>User Details</h3>
                    <p><strong>Username:</strong> {PatientProfileData.username}</p>
                    <p><strong>Email:</strong> {PatientProfileData.email}</p>
                    <p><strong>Role:</strong> {PatientProfileData.role}</p>
                    <p><strong>Phone Number:</strong> {PatientProfileData.phoneNumber}</p>
                </div>
            )}
        </div>
    );
}

export default PatientProfileDetails;
