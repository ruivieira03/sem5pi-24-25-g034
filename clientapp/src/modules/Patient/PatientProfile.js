import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PatientInfo from './PatientInfo';
import PatientUpdate from './PatientUpdate';
import './PatientProfile.css'; // Import your CSS file

const PatientProfile = () => {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phoneNumber: '',
        emergencyContact: '',
        dateOfBirth: '',
        allergiesOrMedicalConditions: '',
        appointmentHistory: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        // Fetch the current profile data when the component mounts
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('https://localhost:5001/api/account/patient-profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Patient Profile Response:', response.data);  // Check the data returned by the API
                setProfileData(response.data);
            } catch (err) {
                setError('Failed to fetch profile data.');
            }
        };

        fetchProfileData();
    }, [token]);

    return (
        <div className="patient-profile-container">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <PatientInfo profileData={profileData} />
            <PatientUpdate 
                profileData={profileData} 
                setProfileData={setProfileData} 
                setError={setError} 
                setSuccess={setSuccess} 
            />
        </div>
    );
};

export default PatientProfile;