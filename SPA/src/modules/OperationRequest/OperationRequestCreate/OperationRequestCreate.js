import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config'; // Import API_BASE_URL
import './OperationRequestCreate.css';

function OperationRequestCreate() {
    const [formData, setFormData] = useState({
        patientID: '',
        doctorID: '',
        operationTypeID: '',
        deadlineDate: '',
        priority: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Handle input changes for all fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/OperationRequest/create`,
                formData,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                }
            );
            if (response.status === 201) {
                setSuccess(true);
                setFormData({
                    patientID: '',
                    doctorID: '',
                    operationTypeID: '',
                    deadlineDate: '',
                    priority: '',
                });
            }
        } catch (err) {
            setLoading(false);
            setError('Failed to create operation request.');
        }
    };

    return (
        <div className="create-operation-request">
            <h3>Create Operation Request</h3>
            {success && <p className="success">Operation request created successfully!</p>}
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleCreate}>
                <div className="form-group">
                    <label htmlFor="patientID">Patient ID:</label>
                    <input
                        type="text"
                        id="patientID"
                        name="patientID"
                        value={formData.patientID}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="doctorID">Doctor ID:</label>
                    <input
                        type="text"
                        id="doctorID"
                        name="doctorID"
                        value={formData.doctorID}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="operationTypeID">Operation Type ID:</label>
                    <input
                        type="text"
                        id="operationTypeID"
                        name="operationTypeID"
                        value={formData.operationTypeID}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            
                <div className="form-group">
                    <label htmlFor="deadlineDate">Deadline Date:</label>
                    <input
                        type="date"
                        id="deadlineDate"
                        name="deadlineDate"
                        value={formData.deadlineDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <input
                        type="text"
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create'}
                </button>
            </form>
        </div>
    );
}

export default OperationRequestCreate;