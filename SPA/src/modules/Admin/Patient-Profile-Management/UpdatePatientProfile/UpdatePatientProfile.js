import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../../config'; // Import API_BASE_URL
import './UpdatePatientProfile.test';

const UpdatePatientProfile = ({ patient, authToken, onUpdateSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        phoneNumber: patient.phoneNumber,
        emergencyContact: patient.emergencyContact,
        allergiesOrMedicalConditions: patient.allergiesOrMedicalConditions,
        appointmentHistory: patient.appointmentHistory, // Supondo que seja um campo editável
    });

    const navigate = useNavigate(); // Hook para navegação

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await axios.put(
                `${API_BASE_URL}/api/Patient/update/${patient.id}`, // Endpoint para atualizar paciente
                formData,
                {
                    headers: { Authorization: `Bearer ${authToken}` },
                }
            );
            setLoading(false);
            onUpdateSuccess(response.data); // Notificar o componente pai sobre o sucesso
        } catch (err) {
            setLoading(false);
            setError('Failed to update patient profile.');
        }
    };

    const handleCancel = () => {
        navigate('/patients'); // Redirecionar para a página de pacientes
    };

    return (
        <div className="update-patient-container">
            <h3>Update Patient Profile</h3>
            {error && <p className="error">{error}</p>}
            <form className="update-patient-form" onSubmit={(e) => e.preventDefault()}>
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
                <label>
                    Allergies or Medical Conditions:
                    <textarea
                        name="allergiesOrMedicalConditions"
                        value={formData.allergiesOrMedicalConditions}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Appointment History:
                    <textarea
                        name="appointmentHistory"
                        value={formData.appointmentHistory}
                        onChange={handleInputChange}
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

export default UpdatePatientProfile;
