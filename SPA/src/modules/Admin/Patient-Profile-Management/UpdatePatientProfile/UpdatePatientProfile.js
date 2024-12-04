import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../../config';
import './UpdatePatientProfile.css';

const UpdatePatientProfile = ({ patient, authToken, onUpdateSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        phoneNumber: patient.phoneNumber,
        emergencyContact: patient.emergencyContact,
        allergiesOrMedicalConditions: patient.allergiesOrMedicalConditions || [],
        appointmentHistory: patient.appointmentHistory || [],
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (e, index, fieldName) => {
        const updatedArray = [...formData[fieldName]];
        updatedArray[index] = e.target.value;
        setFormData({ ...formData, [fieldName]: updatedArray });
    };

    const handleAddField = (fieldName) => {
        setFormData({ ...formData, [fieldName]: [...formData[fieldName], ''] });
    };

    const handleRemoveField = (fieldName, index) => {
        const updatedArray = [...formData[fieldName]];
        updatedArray.splice(index, 1);
        setFormData({ ...formData, [fieldName]: updatedArray });
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await axios.put(
                `${API_BASE_URL}/api/Patient/update/${patient.id}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${authToken}` },
                }
            );
            setLoading(false);
            onUpdateSuccess(response.data);
        } catch (err) {
            setLoading(false);
            setError('Failed to update patient profile.');
        }
    };

    const handleCancel = () => {
        navigate('/admin');
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

                <div className="form-group">
                    <label>Allergies or Medical Conditions:</label>
                    {formData.allergiesOrMedicalConditions.map((item, index) => (
                        <div key={index} className="dynamic-field">
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => handleArrayChange(e, index, 'allergiesOrMedicalConditions')}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveField('allergiesOrMedicalConditions', index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddField('allergiesOrMedicalConditions')}
                    >
                        Add Allergy/Condition
                    </button>
                </div>

                <div className="form-group">
                    <label>Appointment History:</label>
                    {formData.appointmentHistory.map((item, index) => (
                        <div key={index} className="dynamic-field">
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => handleArrayChange(e, index, 'appointmentHistory')}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveField('appointmentHistory', index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddField('appointmentHistory')}
                    >
                        Add Appointment
                    </button>
                </div>

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
