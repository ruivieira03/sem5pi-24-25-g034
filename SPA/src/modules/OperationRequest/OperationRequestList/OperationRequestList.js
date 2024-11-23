import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OperationRequestDelete from '../OperationRequestDelete/OperationRequestDelete';
import OperationRequestUpdate from '../OperationRequestUpdate/OperationRequestUpdate';
import './OperationRequestList.css';

function OperationRequestList() {
    const [operationRequests, setOperationRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [authToken] = useState(localStorage.getItem('authToken'));
    const [deletingRequest, setDeletingRequest] = useState(null);
    const [updatingRequest, setUpdatingRequest] = useState(null);

    useEffect(() => {
        const fetchOperationRequests = async () => {
            try {
                const response = await axios.get('https://localhost:5001/api/OperationRequest/', {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setOperationRequests(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching operation requests.');
                setLoading(false);
            }
        };

        fetchOperationRequests();
    }, [authToken]);

    const handleDeleteSuccess = (requestId) => {
        if (requestId) {
            setOperationRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== requestId)
            );
            alert('Operation request deleted successfully.');
        }
        setDeletingRequest(null);
    };

    const handleUpdateSuccess = (updatedRequest) => {
        if (updatedRequest) {
            setOperationRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.id === updatedRequest.id ? { ...request, ...updatedRequest } : request
                )
            );
            alert('Operation request updated successfully.');
        }
        setUpdatingRequest(null);
    };

    if (loading) return <div className="operation-request-list-container">Loading operation requests...</div>;
    if (error) return <div className="operation-request-list-container">{error}</div>;

    return (
        <div className="operation-request-list-container">
            <h2>Operation Requests</h2>
            <ul className="operation-request-list">
                {operationRequests.length > 0 ? (
                    operationRequests.map((request) => (
                        <li key={request.id} className="operation-request-item">
                            <div className="operation-request-details">
                                <p><strong>ID:</strong> {request.id}</p>
                                <p><strong>Patient ID:</strong> {request.patientID}</p>
                                <p><strong>Doctor ID:</strong> {request.doctorID}</p>
                                <p><strong>Operation Type:</strong> {request.operationTypeID}</p>
                                <p><strong>Deadline:</strong> {new Date(request.deadlineDate).toLocaleDateString()}</p>
                                <p><strong>Priority:</strong> {request.priority}</p>
                            </div>
                            <div className="operation-request-actions">
                                <button
                                    className="action-button delete"
                                    onClick={() => setDeletingRequest(request)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="action-button update"
                                    onClick={() => setUpdatingRequest(request)}
                                >
                                    Update
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="operation-request-item">No operation requests found.</li>
                )}
            </ul>

            {deletingRequest && (
                <div className="modal">
                    <div className="modal-content">
                        <OperationRequestDelete
                            operationRequest={deletingRequest}
                            authToken={authToken}
                            onDeleteSuccess={handleDeleteSuccess}
                        />
                    </div>
                </div>
            )}

            {updatingRequest && (
                <div className="modal">
                    <div className="modal-content">
                        <OperationRequestUpdate
                            operationRequest={updatingRequest}
                            authToken={authToken}
                            onUpdateSuccess={handleUpdateSuccess}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default OperationRequestList;