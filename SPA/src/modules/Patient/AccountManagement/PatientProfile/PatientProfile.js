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
                    `${API_BASE_URL}/api/account/patient-profile`,
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

    const handleDownloadMedicalHistory = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/patient/patient-medical-history`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: 'blob',
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'medical_history.pdf'); // Change file name/format as needed
            document.body.appendChild(link);
            link.click();

            setSuccess('Medical history downloaded successfully.');
        } catch (err) {
            setError('Failed to download medical history.');
            setSuccess('');
        }
    };

    const handleDeletePersonalData = async () => {
        
        try {
            const confirmation = window.confirm(
                'Are you sure you want to delete your personal data? This action is irreversible.'
            );

            if (!confirmation) return;

            await axios.put(`${API_BASE_URL}/api/patient/delete-personal-data/${profileData.patientId}`, {  // doubt for now oonly updating to null, ask professor what is the best practice , this or literrly remove all columns
                headers: { Authorization: `Bearer ${token}` },  
            });

            setSuccess('Your personal data has been successfully deleted.');
            setError('');

            // Optionally log the user out or redirect to another page
            localStorage.removeItem('authToken');
            window.location.reload();
        } catch (err) {
            setError('Failed to delete personal data.');
            setSuccess('');
        }
    };

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
                {activeTab === 'view' && (
                    <div>
                        <PatientInfo profileData={profileData} />
                        <button onClick={handleDownloadMedicalHistory} className="action-button">
                            Download Medical History
                        </button>
                        <button onClick={handleDeletePersonalData} className="action-button delete-button">
                            Delete My Personal Data
                        </button>
                    </div>
                )}
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
