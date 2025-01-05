import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PatientInfo from './PatientInfo';
import PatientUpdate from './UpdateProfile/PatientUpdate';
import { API_BASE_URL } from '../../../../config'; // Import API_BASE_URL
import './PatientProfile.css';


const PatientProfile = () => {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phoneNumber: '',
        emergencyContact: '',
        dateOfBirth: '',
        allergiesOrMedicalConditions: [''],
        appointmentHistory: [''],
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState('view');
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/account/patient-profile`, // Use API_BASE_URL here
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setProfileData(response.data);
            } catch (err) {
                setError('Failed to fetch profile data.');
                setSuccess('');
            }
        };

        fetchProfileData();
    }, [token]);

    return (
        <div className="patient-profile-container">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="patient-profile-tabs">
                <button
                    className={`tab-button ${activeTab === 'view' ? 'active' : ''}`}
                    onClick={() => setActiveTab('view')}
                >
                    View Profile
                </button>
                <button
                    className={`tab-button ${activeTab === 'update' ? 'active' : ''}`}
                    onClick={() => setActiveTab('update')}
                >
                    Update Profile
                </button>
            </div>

            <div className="patient-profile-content">
                {activeTab === 'view' && <PatientInfo profileData={profileData} />}
                {activeTab === 'update' && (
                    <PatientUpdate
                        profileData={profileData}
                        setProfileData={setProfileData}
                        setError={setError}
                        setSuccess={setSuccess}
                    />
                )}
            </div>
        </div>
    );
};

export default PatientProfile;
