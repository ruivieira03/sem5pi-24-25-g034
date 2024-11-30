import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeletePatientProfile from '../DeletePatient-Profile/DeletePatientProfile';
import UpdatePatientProfile from '../UpdatePatientProfile/UpdatePatientProfile';
import { API_BASE_URL } from '../../../../config';
import './PatientProfileList.css';

function PatientProfileList() {
    const [Patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [authToken] = useState(localStorage.getItem('authToken'));
    const [deletingPatientProfile, setDeletingPatientProfile] = useState(null);
    const [updatingPatientProfile, setUpdatingPatientProfile] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/Patient`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setPatients(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching Profiles.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [authToken]);

    const handleDeleteSuccess = (PatientId) => {
        if (PatientId) {
            setPatients((prevPatients) => prevPatients.filter((Patient) => Patient.id !== PatientId));
            alert('Profile deleted successfully.');
        }
        setDeletingPatientProfile(null);
    };

    const handleUpdateSuccess = (updatedUser) => {
        if (updatedUser) {
            setPatients((prevPatients) =>
                prevPatients.map((Patient) =>
                    Patient.id === updatedUser.id ? { ...Patient, ...updatedUser } : Patient
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
                {Patients.length > 0 ? (
                    Patients.map((Patient) => (
                        <li key={Patient.id} className="Patient-item">
                            <div className="Patient-details">
                                <p><strong>Username:</strong> {Patient.username}</p>
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
