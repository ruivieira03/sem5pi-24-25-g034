import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OperationRequestList.css';

function OperationRequestList() {
    const [operationRequests, setOperationRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOperationRequests = async () => {
            try {
                const response = await axios.get('/api/OperationRequest/');
                setOperationRequests(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchOperationRequests();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="operation-request-list">
            <h2>Operation Requests</h2>
            <ul>
                {operationRequests.map(request => (
                    <li key={request.id} className="operation-request-item">
                        <p>Patient ID: {request.patientID}</p>
                        <p>Doctor ID: {request.doctorID}</p>
                        <p>Operation Type: {request.operationTypeID}</p>
                        <p>Deadline: {new Date(request.deadlineDate).toLocaleDateString()}</p>
                        <p>Priority: {request.priority}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OperationRequestList;