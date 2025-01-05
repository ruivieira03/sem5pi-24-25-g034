import React, { useState, useEffect } from 'react';
import { fetchMedicalConditions, fetchMedicalConditionByName } from './manageMedicalConditionService';
import './ManageMedicalCondition.css'; // Import the CSS file

function ManageMedicalConditions() {
    const [medicalConditions, setMedicalConditions] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // Track search input
    const [loading, setLoading] = useState(true);

    // Load medical conditions on mount
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
            loadMedicalConditions(); // Load all medical conditions if search query is empty
            return;
        }
        try {
            setLoading(true);
            const medicalCondition = await fetchMedicalConditionByName(searchQuery);
            setMedicalConditions(medicalCondition ? [medicalCondition] : []); // Display only the found medical condition or an empty list
        } catch (error) {
            console.error('Error searching for medical condition:', error);
            setMedicalConditions([]); // Clear the list if no results
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="manage-medical-conditions">
            <h2>Medical Conditions</h2>

            {/* Search Bar */}
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
                        medicalConditions.map((condition) => (
                            <li key={condition.id} className="medical-condition-item">
                                <strong>{condition.name}</strong>: {condition.description}
                            </li>
                        ))
                    ) : (
                        <p>No medical conditions found.</p>
                    )}
                </ul>
            )}
        </div>
    );
}

export default ManageMedicalConditions;
