import React, { useState, useEffect } from 'react';
import { fetchAllergies, addAllergy, updateAllergy, deleteAllergy, fetchAllergyByName } from './manageAllergiesService';
import './ManageAllergies.css'; // Import the CSS file

function ManageAllergiesAsAdmin() {
    const [allergies, setAllergies] = useState([]);
    const [newAllergy, setNewAllergy] = useState({ name: '', description: '' });
    const [updateAllergyData, setUpdateAllergyData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAllergies();
    }, []);

    const loadAllergies = async () => {
        try {
            setLoading(true);
            const allergiesData = await fetchAllergies();
            setAllergies(allergiesData);
        } catch (error) {
            console.error('Error loading allergies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            loadAllergies();
            return;
        }
        try {
            setLoading(true);
            const allergy = await fetchAllergyByName(searchQuery);
            setAllergies(allergy ? [allergy] : []); // Show the result or empty list
        } catch (error) {
            console.error('Error searching for allergy:', error);
            setAllergies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAllergy = async () => {
        if (!newAllergy.name || !newAllergy.description) {
            alert('Both name and description are required!');
            return;
        }
        try {
            await addAllergy(newAllergy);
            setNewAllergy({ name: '', description: '' });
            loadAllergies();
        } catch (error) {
            console.error('Error adding allergy:', error);
        }
    };

    const handleDeleteAllergy = async (_id) => {
        if (!_id) {
            console.error('Invalid ID provided for deletion.');
            return;
        }
        try {
            await deleteAllergy(_id);
            loadAllergies();
        } catch (error) {
            console.error('Error deleting allergy:', error);
        }
    };

    const handleEditAllergy = (allergy) => {
        setUpdateAllergyData(allergy);
    };

    const handleUpdateAllergy = async () => {
        if (!updateAllergyData.name || !updateAllergyData.description) {
            alert('Both name and description are required!');
            return;
        }
        try {
            await updateAllergy(updateAllergyData._id, updateAllergyData);
            setUpdateAllergyData(null);
            loadAllergies();
        } catch (error) {
            console.error('Error updating allergy:', error);
        }
    };

    return (
        <div className="manage-allergies">
            <h2>Manage Allergies</h2>

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search by allergy name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {loading ? (
                <p>Loading allergies...</p>
            ) : (
                <ul className="allergy-list">
                    {allergies.length > 0 ? (
                        allergies.map((allergy) => (
                            <li key={allergy._id} className="allergy-item">
                                <strong>{allergy.name}</strong>: {allergy.description}
                                <div className="allergy-actions">
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEditAllergy(allergy)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteAllergy(allergy._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No allergies found. Add a new one below.</p>
                    )}
                </ul>
            )}

            {updateAllergyData ? (
                <div className="update-section">
                    <h3>Update Allergy</h3>
                    <input
                        type="text"
                        placeholder="Allergy Name"
                        value={updateAllergyData.name}
                        onChange={(e) =>
                            setUpdateAllergyData({ ...updateAllergyData, name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={updateAllergyData.description}
                        onChange={(e) =>
                            setUpdateAllergyData({
                                ...updateAllergyData,
                                description: e.target.value,
                            })
                        }
                    />
                    <button className="update-button" onClick={handleUpdateAllergy}>
                        Update Allergy
                    </button>
                    <button
                        className="cancel-button"
                        onClick={() => setUpdateAllergyData(null)}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="add-section">
                    <h3>Add New Allergy</h3>
                    <input
                        type="text"
                        placeholder="Allergy Name"
                        value={newAllergy.name}
                        onChange={(e) => setNewAllergy({ ...newAllergy, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newAllergy.description}
                        onChange={(e) =>
                            setNewAllergy({ ...newAllergy, description: e.target.value })
                        }
                    />
                    <button className="add-button" onClick={handleAddAllergy}>
                        Add Allergy
                    </button>
                </div>
            )}
        </div>
    );
}

export default ManageAllergiesAsAdmin;
