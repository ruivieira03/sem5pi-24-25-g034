import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OperationRequestUpdate.css';

const OperationRequestUpdate = ({ operationRequest, authToken, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        id: operationRequest.id,
        patientID: operationRequest.patientID,
        doctorID: operationRequest.doctorID,
        operationTypeID: operationRequest.operationTypeID,
        deadlineDate: operationRequest.deadlineDate,
        priority: operationRequest.priority,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await axios.put(
                `https://localhost:5001/api/OperationRequest/${operationRequest.id}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${authToken}` },
                }
            );
            setLoading(false);
            onUpdateSuccess(response.data); // Notify parent of successful update
        } catch (err) {
            setLoading(false);
            setError('Failed to update operation request.');
        }
    };

    const handleCancel = () => {
        navigate('/admin'); // Redirect to /admin
    };

    return (
        <div className="update-operation-request-container">
            <h3>Update Operation Request</h3>
            {error && <p className="error">{error}</p>}
            <form className="update-operation-request-form" onSubmit={(e) => e.preventDefault()}>
                <label>
                    Patient ID:
                    <input
                        type="text"
                        name="patientID"
                        value={formData.patientID}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Doctor ID:
                    <input
                        type="text"
                        name="doctorID"
                        value={formData.doctorID}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Operation Type ID:
                    <input
                        type="text"
                        name="operationTypeID"
                        value={formData.operationTypeID}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Deadline Date:
                    <input
                        type="date"
                        name="deadlineDate"
                        value={formData.deadlineDate}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Priority:
                    <input
                        type="text"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        required
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
                        onClick={handleCancel} // Navigate to /admin
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OperationRequestUpdate;