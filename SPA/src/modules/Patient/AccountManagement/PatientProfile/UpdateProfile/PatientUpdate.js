import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../../../config'; // Import API_BASE_URL
import './PatientUpdate.css'; // Updated styles file

const PatientUpdate = ({ profileData, authToken, setProfileData, setError, setSuccess }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phoneNumber: '',
        emergencyContact: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setLocalError] = useState('');
    const navigate = useNavigate(); // For navigation when cancel button is clicked
    const token = localStorage.getItem('authToken');

    // Populate the form fields with the current profile data when the component mounts
    useEffect(() => {
        setFormData(profileData);
    }, [profileData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await axios.put(
                `${API_BASE_URL}/api/account/update-profile`, // Use API_BASE_URL here
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setLoading(false);
            setProfileData(response.data); // Update parent state with the new profile data
            setSuccess('Profile updated successfully!');
            setLocalError('');
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || 'Failed to update profile.';
            setLocalError(errorMessage);
            setError(errorMessage);
        }
    };

    const handleCancel = () => {
        navigate('/patient'); // Redirect to the patient page when cancel is clicked
    };

    return (
        <div className="patient-update-container">
            <h2>Update Patient Profile</h2>
            {error && <p className="error">{error}</p>}
            <form className="patient-update-form" onSubmit={(e) => e.preventDefault()}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Gender:
                    <input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Emergency Contact:
                    <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <div className="button-group">
                    <button
                        type="button"
                        className="update-button"
                        onClick={handleUpdate}
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientUpdate;
