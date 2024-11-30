import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeletePatientProfile from '../DeletePatient-Profile/DeletePatientProfile';
import UpdatePatientProfile from '../UpdatePatientProfile/UpdatePatientProfile';
import { API_BASE_URL } from '../../../../config';
import './PatientProfileList.css';

function PatientProfileList() {
    const [patient, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [authToken] = useState(localStorage.getItem('authToken'));
    const [deletingPatientProfile, setDeletingPatientProfile] = useState(null);
    const [updatingPatientProfile, setUpdatingPatientProfile] = useState(null);

    useEffect(() => {
        const fetchPatientProfiles = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/Patient/getAll`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setPatients(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching Profiles.');
                setLoading(false);
            }
        };

        fetchPatientProfiles();
    }, [authToken]);

    const handleDeleteSuccess = (PatientId) => {
        if (PatientId) {
            setPatients((prevPatients) => prevPatients.filter((Patient) => Patient.id !== PatientId));
            alert('Profile deleted successfully.');
        }
        setDeletingPatientProfile(null);
    };

    const handleUpdateSuccess = (updatedPatientProfiles) => {
        if (updatedPatientProfiles) {
            setPatients((prevPatients) =>
                prevPatients.map((Patient) =>
                    Patient.id === updatedPatientProfiles.id ? { ...Patient, ...updatedPatientProfiles } : Patient
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
            <h2>System Users</h2>
            <ul className="Patient Profiles-list">
                {patient.length > 0 ? (
                    patient.map((Patient) => (
                        <li key={Patient.id} className="Patient-item">
                            
                           
                <div className="patient-details">
                    <h3>Patient Profile Details:</h3>

                    <p><strong>First Name:</strong> {Patient.firstName}</p>
                    <p><strong>Last Name:</strong> {Patient.lastName}</p>
                    <p><strong>Email:</strong> {Patient.email}</p>
                    <p><strong>Phone Number:</strong> {Patient.phoneNumber}</p>
                    <p><strong>Emergency Contact:</strong> {Patient.emergencyContact}</p>
                    <p><strong>Allergies:</strong> {Patient.allergies}</p>
                    <p><strong>Medical History:</strong> {Patient.AppointmentHistory}</p>

                    </div>

                            <div className="Patient-actions">
                                <button
                                    className="action-button delete"
                                    onClick={() => setDeletingPatientProfile(Patient)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="action-button update"
                                    onClick={() => setUpdatingPatientProfile(Patient)}
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
                    patient={deletingPatientProfile}
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
