import React from 'react';
import './PatientInfo.css'; // Import the CSS file for styling

const PatientInfo = ({ profileData }) => {
    return (
        <div className="patient-info-container">
            <h2 className="patient-info-title">Patient Information</h2>
            <ul className="patient-info-list">
                <li><strong className="label">First Name:</strong> <span className="value">{profileData.firstName}</span></li>
                <li><strong className="label">Last Name:</strong> <span className="value">{profileData.lastName}</span></li>
                <li><strong className="label">Date of Birth:</strong> <span className="value">{profileData.dateOfBirth}</span></li>
                <li><strong className="label">Gender:</strong> <span className="value">{profileData.gender}</span></li>
                <li><strong className="label">Email:</strong> <span className="value">{profileData.email}</span></li>
                <li><strong className="label">Phone Number:</strong> <span className="value">{profileData.phoneNumber}</span></li>
                <li><strong className="label">Emergency Contact:</strong> <span className="value">{profileData.emergencyContact}</span></li>
                <li><strong className="label">Allergies/Medical Conditions:</strong> <span className="value">{profileData.allergiesOrMedicalConditions}</span></li>
                <li><strong className="label">Appointment History:</strong> <span className="value">{profileData.appointmentHistory}</span></li>
            </ul>
        </div>
    );
};

export default PatientInfo;
