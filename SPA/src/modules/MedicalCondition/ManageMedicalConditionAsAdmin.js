import React, { useState, useEffect } from 'react';
import { fetchMedicalConditions, addMedicalCondition, updateMedicalCondition, deleteMedicalCondition, fetchMedicalConditionByName } from './manageMedicalConditionService';
import './ManageMedicalCondition.css';

function ManageMedicalConditionAsAdmin() {
    const [medicalConditions, setMedicalConditions] = useState([]);
    const [newMedicalCondition, setNewMedicalCondition] = useState({ name: '', description: '' });
    const [updateMedicalConditionData, setUpdateMedicalConditionData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMedicalConditions();
    }, []);

    const loadMedicalConditions = async () => {
        try {
            setLoading(true);
            const medicalConditionsData = await fetchMedicalConditions();
            setMedicalConditions(medicalConditionsData);
        } catch (error) {
            console.error('Error loading medical conditions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            loadMedicalConditions();
            return;
        }
        try {
            setLoading(true);
            const medicalCondition = await fetchMedicalConditionByName(searchQuery);
            setMedicalConditions(medicalCondition ? [medicalCondition] : []);
        } catch (error) {
            console.error('Error searching for medical condition:', error);
            setMedicalConditions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMedicalCondition = async () => {
        if (!newMedicalCondition.name || !newMedicalCondition.description) {
            alert('Both name and description are required!');
            return;
        }
        try {
            await addMedicalCondition(newMedicalCondition);
            setNewMedicalCondition({ name: '', description: '' });
            loadMedicalConditions();
        } catch (error) {
            console.error('Error adding medical condition:', error);
        }
    };

    const handleDeleteMedicalCondition = async (domainId) => {
        if (!domainId) {
            console.error('No domainId provided for soft delete');
            alert('Failed to delete: Invalid ID');
            return;
        }
    
        console.log('Soft deleting medical condition with domainId:', domainId); // Debug log
        try {
            await deleteMedicalCondition(domainId);
            loadMedicalConditions();
        } catch (error) {
            console.error('Error soft deleting medical condition:', error);
        }
    };       

    const handleEditMedicalCondition = (medicalCondition) => {
        setUpdateMedicalConditionData(medicalCondition);
    };

    const handleUpdateMedicalCondition = async () => {
        if (!updateMedicalConditionData.domainId) {
            console.error('No domainId provided for update');
            alert('Failed to update: Invalid ID');
            return;
        }
    
        console.log('Updating medical condition with domainId:', updateMedicalConditionData.domainId); // Debug log
        try {
            await updateMedicalCondition(updateMedicalConditionData.domainId, updateMedicalConditionData);
            setUpdateMedicalConditionData(null);
            loadMedicalConditions();
        } catch (error) {
            console.error('Error updating medical condition:', error);
        }
    };    

    return (
        <div className="manage-medical-conditions">
            <h2>Manage Medical Conditions</h2>

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search by medical condition name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {loading ? (
                <p>Loading medical conditions...</p>
            ) : (
                <ul className="medical-condition-list">
                    {medicalConditions.length > 0 ? (
                        medicalConditions.map((medicalCondition) => (
                            <li key={medicalCondition.domainId} className="medical-condition-item">
                                <strong>{medicalCondition.name}</strong>: {medicalCondition.description}
                                <div className="medical-condition-actions">
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEditMedicalCondition(medicalCondition)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteMedicalCondition(medicalCondition.domainId)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No medical conditions found. Add a new one below.</p>
                    )}
                </ul>
            )}

            {updateMedicalConditionData ? (
                <div className="update-section">
                    <h3>Update Medical Condition</h3>
                    <input
                        type="text"
                        placeholder="Medical Condition Name"
                        value={updateMedicalConditionData.name}
                        onChange={(e) =>
                            setUpdateMedicalConditionData({ ...updateMedicalConditionData, name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={updateMedicalConditionData.description}
                        onChange={(e) =>
                            setUpdateMedicalConditionData({
                                ...updateMedicalConditionData,
                                description: e.target.value,
                            })
                        }
                    />
                    <button className="update-button" onClick={handleUpdateMedicalCondition}>
                        Update Medical Condition
                    </button>
                    <button
                        className="cancel-button"
                        onClick={() => setUpdateMedicalConditionData(null)}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="add-section">
                    <h3>Add New Medical Condition</h3>
                    <input
                        type="text"
                        placeholder="Medical Condition Name"
                        value={newMedicalCondition.name}
                        onChange={(e) => setNewMedicalCondition({ ...newMedicalCondition, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newMedicalCondition.description}
                        onChange={(e) =>
                            setNewMedicalCondition({ ...newMedicalCondition, description: e.target.value })
                        }
                    />
                    <button className="add-button" onClick={handleAddMedicalCondition}>
                        Add Medical Condition
                    </button>
                </div>
            )}
        </div>
    );
}

export default ManageMedicalConditionAsAdmin;
