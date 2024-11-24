import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config'; // Import API_BASE_URL
import './OperationRequestByPriority.css'; // Import CSS file for styling

function OperationRequestByPriority() {
    const [priority, setPriority] = useState(''); // State for priority input
    const [requestData, setRequestData] = useState([]); // State for fetched operation request data
    const [error, setError] = useState(''); // State for error messages

    const fetchRequest = async () => {
        setError(''); // Clear any previous error
        setRequestData([]); // Clear previous request data

        if (!priority || priority < 1) {
            setError('Please provide a valid priority.');
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/api/OperationRequest/priority/${priority}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Add token for authentication
                },
            });
            setRequestData(response.data); // Set the fetched request data
            // if empty, set 404 error
            if (response.data.length === 0) {
                setError('Operation request not found.');
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('Operation request not found.');
            } else {
                setError('Operation request not found.');
            }
        }
    };

    return (
        <div className="operation-request-container">
            <h2>Get Operation Request Details by Priority</h2>

            <div className="input-section">
                <label htmlFor="priority">Priority:</label>
                <input
                    type="number"
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    placeholder="Enter Priority"
                />
                <button onClick={fetchRequest}>Fetch Request</button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {requestData.length > 0 && (
                <div className="operation-request-details">
                    <h3>Operation Request Details</h3>
                    {requestData.map((request) => (
                        <div key={request.id} className="operation-request-item">
                            <p><strong>ID:</strong> {request.id}</p>
                            <p><strong>Patient ID:</strong> {request.patientID}</p>
                            <p><strong>Doctor ID:</strong> {request.doctorID}</p>
                            <p><strong>Operation Type ID:</strong> {request.operationTypeID}</p>
                            <p><strong>Deadline Date:</strong> {new Date(request.deadlineDate).toLocaleDateString()}</p>
                            <p><strong>Priority:</strong> {request.priority}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OperationRequestByPriority;