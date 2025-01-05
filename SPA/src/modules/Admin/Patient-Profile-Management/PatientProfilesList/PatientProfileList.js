import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeletePatientProfile from '../DeletePatient-Profile/DeletePatientProfile';
import UpdatePatientProfile from '../UpdatePatientProfile/UpdatePatientProfile';
import { API_BASE_URL } from '../../../../config';
import './PatientProfileList.css';

function PatientProfileList() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [authToken] = useState(localStorage.getItem('authToken'));
    const [deletingPatientProfile, setDeletingPatientProfile] = useState(null);
    const [updatingPatientProfile, setUpdatingPatientProfile] = useState(null);
   

    useEffect(() => {

        const fetchPatientProfiles = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/Patient/getAll`, {
                    headers: { 
                        Authorization: `Bearer ${authToken}` },
                });
                console.log('Fetched patient data:', response.data); // Debugging log
                setPatients(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching Profiles:', err); // Debug log
                setError('Error fetching Profiles.');
                setLoading(false);
            }
        };

        fetchPatientProfiles();
    }, [authToken]);

    const handleDeleteSuccess = (patientId) => {
        if (patientId) {
            setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== patientId));
            alert('Profile deleted successfully.');
        }
        setDeletingPatientProfile(null);
    };

    const handleUpdateSuccess = (updatedPatient) => {
        if (updatedPatient) {
            setPatients((prevPatients) =>
                prevPatients.map((patient) =>
                    patient.id === updatedPatient.id ? { ...patient, ...updatedPatient } : patient
                )
            );
            alert('Profile updated successfully.');
        }
        setUpdatingPatientProfile(null);
    };

    if (loading) return <div className="patient-profile-list-container">Loading Profiles...</div>;
    if (error) return <div className="patient-profile-list-container">{error}</div>;

    return (
        <div className="patient-profile-list-container">
              <h2>Patient Profiles </h2>
            <ul className="Patient Profiles-list">
                {patients.length > 0 ? (
                    patients.map((patient) => (
                        <li key={patient.id} className="Patient-item">
                            <div className="patient-details">
                                <h3>Patient Profile Details:</h3>
                                <p><strong>First Name:</strong> {patient.firstName}</p>
                                <p><strong>Last Name:</strong> {patient.lastName}</p>
                                <p><strong>Email:</strong> {patient.email}</p>
                                <p><strong>Phone Number:</strong> {patient.phoneNumber}</p>
                                <p><strong>Emergency Contact:</strong> {patient.emergencyContact}</p>
                                <p><strong>Allergies:</strong> {patient.allergiesOrMedicalCondition}</p>
                                <p><strong>Medical History:</strong> {patient.AppointmentHistory}</p>
                            </div>
                            <div className="Patient-actions">
                                <button
                                    className="action-button delete"
                                    onClick={() => {
                                        console.log('Patient object being set for deletion:', patient);
                                        setDeletingPatientProfile(patient);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    className="action-button update"
                                    onClick={() => setUpdatingPatientProfile(patient)}
                                >
                                    Update
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="patient-item">No Profiles found.</li>
                )}
            </ul>

            {deletingPatientProfile && (
                <div className="modal">
                    <div className="modal-content">
                        <DeletePatientProfile
                            Patient={deletingPatientProfile}
                            authToken={authToken}
                            onDeleteSuccess={handleDeleteSuccess}
                        />
                    </div>
                </div>
            )}

            {updatingPatientProfile && (
                <div className="modal">
                    <div className="modal-content">
                        <UpdatePatientProfile
                            patient={updatingPatientProfile}
                            authToken={authToken}
                            onUpdateSuccess={handleUpdateSuccess}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default PatientProfileList;