import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config'; // Import API_BASE_URL
import './OperationRequestByPatient.css'; // Import CSS file for styling

function OperationRequestByPatient() {
    const [patientId, setPatientId] = useState(''); // State for patient ID input
    const [requestData, setRequestData] = useState(null); // State for fetched operation request data
    const [error, setError] = useState(''); // State for error messages

    const fetchRequest = async () => {
        setError(''); // Clear any previous error
        setRequestData(null); // Clear previous request data

        if (!patientId) {
            setError('Please provide a valid patient ID.');
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/api/OperationRequest/patient/${patientId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Add token for authentication
                },
            });
            setRequestData(response.data); // Set the fetched request data
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('Operation request not found.');
            } else {
                setError('An error occurred while fetching operation request details.');
            }
        }
    };

    return (
        <div className="operation-request-container">
            <h2>Get Operation Request Details by Patient ID</h2>

            <div className="input-section">
                <label htmlFor="patientId">Patient ID:</label>
                <input
                    type="text"
                    id="patientId"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    placeholder="Enter Patient ID"
                />
                <button onClick={fetchRequest}>Fetch Request</button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {requestData && (
                <div className="operation-request-details">
                    <h3>Operation Request Details</h3>
                    <p><strong>ID:</strong> {requestData.id}</p>
                    <p><strong>Patient ID:</strong> {requestData.patientID}</p>
                    <p><strong>Doctor ID:</strong> {requestData.doctorID}</p>
                    <p><strong>Operation Type ID:</strong> {requestData.operationTypeID}</p>
                    <p><strong>Deadline Date:</strong> {new Date(requestData.deadlineDate).toLocaleDateString()}</p>
                    <p><strong>Priority:</strong> {requestData.priority}</p>
                </div>
            )}
        </div>
    );
}

export default OperationRequestByPatient;