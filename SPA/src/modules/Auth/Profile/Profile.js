// src/modules/Auth/Profile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Import the CSS file

function Profile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('authToken');
            console.log('Token:', token);  // Debugging log

            if (!token) {
                setError('No token found. Please log in.');
                return;
            }

            try {
                const response = await axios.get('https://localhost:5001/api/account/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Profile Response:', response.data);  // Check the data returned by the API
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                const errorMessage = error.response?.data || error.message || 'An unknown error occurred.';
                setError('Error fetching profile: ' + errorMessage);
            }            
        };

        fetchProfile();
    }, []);

    return (
        <div className="profile-container">
            {error && <p className="error-message">{error}</p>}
            {profile ? (
                <div>
                    <h2 className="profile-header">Profile</h2>
                    <p className="profile-info">Username: {profile.username}</p>
                    <p className="profile-info">Email: {profile.email}</p>
                    <p className="profile-info">Role: {profile.role}</p>
                    <p className="profile-info">User Id: {profile.userId}</p>
                </div>
            ) : (
                <p className="loading-message">Loading...</p>
            )}
        </div>
    );
}

export default Profile;