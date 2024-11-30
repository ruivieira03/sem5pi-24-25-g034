import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config';
import './PatientProfileDetails.css'; // Import CSS file for styling

function PatientProfileDetails() {
    const [email, setPatientId] = useState(''); // State for user ID input
    const [PatientProfileData, setPatientProfileData] = useState(null); // State for fetched user data
    const [error, setError] = useState(''); // State for error messages

    const fetchPatient = async () => {
        setError(''); // Clear any previous error
        setPatientProfileData(null); // Clear previous user data

        if (!email) {
            setError('Please provide a valid email.');
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/api/Patient/email/${email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Add token for authentication
                },
            });
            setPatientProfileData(response.data); // Set the fetched user data
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('Patient Profile not found.');
            } else {
                setError('An error occurred while fetching Patient Profile details.');
            }
        }
    };

    return (
        <div className="patient-profile-details-container">
            <h2>Get Patient Profile Details</h2>


            <div className="input-section">
                <label htmlFor="PatientProfileEmail">Email or PhoneNumber:</label>
                <input
                    type="text"
                    id="Email"
                    value={email}
                    onChange={(e) => setPatientId(e.target.value)}
                    placeholder="Enter Email (lacking phoneNumber for Now)"
                />
                <button onClick={fetchPatient}>Fetch Patient Profile</button>
            </div>
            {error && <div className="error-message">{error}</div>}

            {PatientProfileData && (
                <div className="Patient-details">
                    <h3>Patient Profile Details:</h3>

                    <p><strong>Email:</strong> {PatientProfileData.email}</p>
                    <p><strong>Phone Number:</strong> {PatientProfileData.phoneNumber}</p>
                    <p><strong>MRN:</strong> {PatientProfileData.medicalRecordNumber}</p>
                    <p><strong>EmergencyContact:</strong> {PatientProfileData.emergencyContact}</p>

                </div>
            )}
        </div>
    );
}

export default PatientProfileDetails;
