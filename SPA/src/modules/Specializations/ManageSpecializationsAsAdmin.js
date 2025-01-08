import React, { useState, useEffect } from 'react';
import { fetchSpecializations, addSpecialization, updateSpecialization, deleteSpecialization, fetchSpecializationByName } from './manageSpecializationsService';
import './ManageSpecializations.css';

function ManageSpecializationsAsAdmin() {
    const [specializations, setSpecializations] = useState([]);
    const [newSpecialization, setNewSpecialization] = useState({ name: '', description: '' });
    const [updateSpecializationData, setUpdateSpecializationData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null); // State for showing messages

    useEffect(() => {
        loadSpecializations();
    }, []);

    const loadSpecializations = async () => {
        try {
            setLoading(true);
            const specializationsData = await fetchSpecializations();
            setSpecializations(specializationsData);
        } catch (error) {
            console.error('Error loading specializations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            loadSpecializations();
            return;
        }
        try {
            setLoading(true);
            const specialization = await fetchSpecializationByName(searchQuery);
            setSpecializations(specialization ? [specialization] : []);
        } catch (error) {
            console.error('Error searching for specialization:', error);
            setSpecializations([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSpecialization = async () => {
        if (!newSpecialization.name || !newSpecialization.description) {
            alert('Both name and description are required!');
            return;
        }
        try {
            await addSpecialization(newSpecialization);
            setNewSpecialization({ name: '', description: '' });
            setNotification('Specialization added successfully!'); // Set success message
            loadSpecializations();
        } catch (error) {
            console.error('Error adding specialization:', error);
            setNotification('Failed to add specialization. Please try again.'); // Set error message
        } finally {
            setTimeout(() => setNotification(null), 3000); // Clear message after 3 seconds
        }
    };

    const handleDeleteSpecialization = async (domainId) => {
        if (!domainId) {
            console.error('No domainId provided for soft delete');
            alert('Failed to delete: Invalid ID');
            return;
        }

        console.log('Soft deleting specialization with domainId:', domainId); // Debug log
        try {
            await deleteSpecialization(domainId);
            setNotification('Specialization deleted successfully!');
            loadSpecializations();
        } catch (error) {
            console.error('Error soft deleting specialization:', error);
            setNotification('Failed to delete specialization. Please try again.');
        } finally {
            setTimeout(() => setNotification(null), 3000); // Clear message after 3 seconds
        }
    };

    const handleEditSpecialization = (specialization) => {
        setUpdateSpecializationData(specialization);
    };

    const handleUpdateSpecialization = async () => {
        if (!updateSpecializationData.domainId) {
            console.error('No domainId provided for update');
            alert('Failed to update: Invalid ID');
            return;
        }

        console.log('Updating specialization with domainId:', updateSpecializationData.domainId); // Debug log
        try {
            await updateSpecialization(updateSpecializationData.domainId, updateSpecializationData);
            setUpdateSpecializationData(null);
            setNotification('Specialization updated successfully!');
            loadSpecializations();
        } catch (error) {
            console.error('Error updating specialization:', error);
            setNotification('Failed to update specialization. Please try again.');
        } finally {
            setTimeout(() => setNotification(null), 3000); // Clear message after 3 seconds
        }
    };

    return (
        <div className="manage-specializations">
            <h2>Manage Specializations</h2>

            {notification && <div className="notification">{notification}</div>}

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search by specialization name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {loading ? (
                <p>Loading specializations...</p>
            ) : (
                <ul className="specialization-list">
                    {specializations.length > 0 ? (
                        specializations.map((specialization) => (
                            <li key={specialization.domainId} className="specialization-item">
                                <strong>{specialization.name}</strong>: {specialization.description}
                                <div className="specialization-actions">
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEditSpecialization(specialization)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteSpecialization(specialization.domainId)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No specializations found. Add a new one below.</p>
                    )}
                </ul>
            )}

            {updateSpecializationData ? (
                <div className="update-section">
                    <h3>Update Specialization</h3>
                    <input
                        type="text"
                        placeholder="Specialization Name"
                        value={updateSpecializationData.name}
                        onChange={(e) =>
                            setUpdateSpecializationData({ ...updateSpecializationData, name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={updateSpecializationData.description}
                        onChange={(e) =>
                            setUpdateSpecializationData({
                                ...updateSpecializationData,
                                description: e.target.value,
                            })
                        }
                    />
                    <button className="update-button" onClick={handleUpdateSpecialization}>
                        Update Specialization
                    </button>
                    <button
                        className="cancel-button"
                        onClick={() => setUpdateSpecializationData(null)}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="add-section">
                    <h3>Add New Specialization</h3>
                    <input
                        type="text"
                        placeholder="Specialization Name"
                        value={newSpecialization.name}
                        onChange={(e) => setNewSpecialization({ ...newSpecialization, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newSpecialization.description}
                        onChange={(e) =>
                            setNewSpecialization({ ...newSpecialization, description: e.target.value })
                        }
                    />
                    <button className="add-button" onClick={handleAddSpecialization}>
                        Add Specialization
                    </button>
                </div>
            )}
        </div>
    );
}

export default ManageSpecializationsAsAdmin;
