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

    const handleArrayChange = (e, index, field) => {
        const newArray = [...formData[field]];
        newArray[index] = e.target.value;
        setFormData({ ...formData, [field]: newArray });
      };
      
      const handleAddField = (field) => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
      };
      
      const handleRemoveField = (field, index) => {
        const newArray = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: newArray });
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
                
                <div className="form-group">
  <label>Allergies or Medical Conditions:</label>
  {(formData?.allergiesOrMedicalConditions || []).map((item, index) => (
    <div key={index}>
      <input
        type="text"
        value={item}
        onChange={(e) =>
          handleArrayChange(e, index, "allergiesOrMedicalConditions")
        }
      />
      <button
        type="button"
        onClick={() =>
          handleRemoveField("allergiesOrMedicalConditions", index)
        }
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() =>
      handleAddField("allergiesOrMedicalConditions")
    }
  >
    Add Allergy/Condition
  </button>
</div>




                <div className="form-group">
  <label>Appointment History:</label>
  {(formData?.appointmentHistory || []).map((item, index) => (
    <div key={index}>
      <input
        type="text"
        value={item}
        onChange={(e) =>
          handleArrayChange(e, index, "appointmentHistory")
        }
      />
      <button
        type="button"
        onClick={() =>
          handleRemoveField("appointmentHistory", index)
        }
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() => handleAddField("appointmentHistory")}
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
