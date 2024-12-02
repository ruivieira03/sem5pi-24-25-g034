import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../../config'; // Import API_BASE_URL
import './UpdatePatientProfile.css';

const UpdatePatientProfile = ({ Patient, authToken, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        DateOfBirth: '',
        Gender: '',
        Email: '',
        PhoneNumber: '',
        EmergencyContact: '',
        Allergies: '',
        MedicalHistory: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await axios.put(
                `${API_BASE_URL}/api/Patient/update-profile/${Patient.id}`, // Use API_BASE_URL here
                formData,
                {
                    headers: { Authorization: `Bearer ${authToken}` },
                }
            );
            setLoading(false);
            onUpdateSuccess(response.data); // Notify parent of successful update
        } catch (err) {
            setLoading(false);
            setError('Failed to update patient Profile.');
        }
    };

    const handleCancel = () => {
        navigate('Admin'); // wRedirect to /admin
    };

    return (
        <div className="update-patient-profile-container">
        <h3>Update Patient Profile</h3>
        {error && <p className="error">{error}</p>}
        <form className="update-patient-form" onSubmit={(e) => e.preventDefault()}>
            <label>
                First Name:
                <input
                    type="text"
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                Phone Number:
                <input
                    type="tel"
                    name="PhoneNumber"
                    value={formData.PhoneNumber}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                Emergency Contact:
                <input
                    type="tel"
                    name="EmergencyContact"
                    value={formData.EmergencyContact}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Allergies:
                <textarea
                    name="Allergies"
                    value={formData.Allergies}
                    onChange={handleInputChange}
                ></textarea>
            </label>
            <label>
                Medical History:
                <textarea
                    name="MedicalHistory"
                    value={formData.MedicalHistory}
                    onChange={handleInputChange}
                ></textarea>
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
                    onClick={handleCancel} // Navigate to /admin
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
    );
};

export default UpdatePatientProfile;
