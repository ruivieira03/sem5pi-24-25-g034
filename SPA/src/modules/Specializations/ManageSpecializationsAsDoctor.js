import React, { useState, useEffect } from 'react';
import { fetchSpecializations, fetchSpecializationByName } from './manageSpecializationsService';
import './ManageSpecializations.css'; // Import the CSS file

function ManageSpecializations() {
    const [specializations, setSpecializations] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // Track search input
    const [loading, setLoading] = useState(true);

    // Load specializations on mount
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
            loadSpecializations(); // Load all specializations if search query is empty
            return;
        }
        try {
            setLoading(true);
            const specialization = await fetchSpecializationByName(searchQuery);
            setSpecializations(specialization ? [specialization] : []); // Display only the found specialization or an empty list
        } catch (error) {
            console.error('Error searching for specialization:', error);
            setSpecializations([]); // Clear the list if no results
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="manage-specializations">
            <h2>Specializations</h2>

            {/* Search Bar */}
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
                            <li key={specialization.id} className="specialization-item">
                                <strong>{specialization.name}</strong>: {specialization.description}
                            </li>
                        ))
                    ) : (
                        <p>No specializations found.</p>
                    )}
                </ul>
            )}
        </div>
    );
}

export default ManageSpecializations;
