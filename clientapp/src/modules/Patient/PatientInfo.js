import React from 'react';

const PatientInfo = ({ profileData }) => {
    return (
        <div className="patient-info-container">
            <h2>Patient Information</h2>
            <ul>
                <li><strong>First Name:</strong> {profileData.firstName}</li>
                <li><strong>Last Name:</strong> {profileData.lastName}</li>
                <li><strong>Date of Birth:</strong> {profileData.dateOfBirth}</li>
                <li><strong>Gender:</strong> {profileData.gender}</li>
                <li><strong>Email:</strong> {profileData.email}</li>
                <li><strong>Phone Number:</strong> {profileData.phoneNumber}</li>
                <li><strong>Emergency Contact:</strong> {profileData.emergencyContact}</li>
                <li><strong>Allergies/Medical Conditions:</strong> {profileData.allergiesOrMedicalConditions}</li>
                <li><strong>Appointment History:</strong> {profileData.appointmentHistory}</li>
            </ul>
        </div>
    );
};

export default PatientInfo;