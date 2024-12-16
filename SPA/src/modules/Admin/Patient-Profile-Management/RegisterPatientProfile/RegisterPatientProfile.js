import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config'; // Import API_BASE_URL
import './RegisterPatientProfile.css';

function RegisterPatientProfile() {
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
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const payload = { ...formData };
            const response = await axios.post(
                `${API_BASE_URL}/api/Patient/register-profile`, // Use API_BASE_URL here
                payload,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                }
            );

            if (response.status === 201) { // success, registered
                setSuccess(true);
                setFormData({
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
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during Profile registration.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-patient-profile-container">
            <h2>Register new Patient Profile on the System </h2>
            {success && <p className="success">Registration successful!</p>}
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="LastName"
                        value={formData.LastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="DateOfBirth"
                        value={formData.DateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="Gender"
                        value={formData.Gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="PhoneNumber"
                        value={formData.PhoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="emergencyContact">Emergency Contact:</label>
                    <input
                        type="tel"
                        id="emergencyContact"
                        name="EmergencyContact"
                        value={formData.EmergencyContact}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="allergies">Allergies:</label>
                    <textarea
                        id="allergies"
                        name="Allergies"
                        value={formData.Allergies}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="medicalHistory">Medical History:</label>
                    <textarea
                        id="medicalHistory"
                        name="MedicalHistory"
                        value={formData.MedicalHistory}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Registering Profile...' : 'Register'}
                </button>
            </form>
        </div>
    );
}

export default RegisterPatientProfile;
