import React, { useState, useEffect } from 'react';
import { fetchAllergies, fetchAllergyByName } from './manageAllergiesService';
import './ManageAllergies.css'; // Import the CSS file

function ManageAllergies() {
    const [allergies, setAllergies] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // Track search input
    const [loading, setLoading] = useState(true);

    // Load allergies on mount
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
            loadAllergies(); // Load all allergies if search query is empty
            return;
        }
        try {
            setLoading(true);
            const allergy = await fetchAllergyByName(searchQuery);
            setAllergies(allergy ? [allergy] : []); // Display only the found allergy or an empty list
        } catch (error) {
            console.error('Error searching for allergy:', error);
            setAllergies([]); // Clear the list if no results
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="manage-allergies">
            <h2>Allergies</h2>

            {/* Search Bar */}
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
                            <li key={allergy.id} className="allergy-item">
                                <strong>{allergy.name}</strong>: {allergy.description}
                            </li>
                        ))
                    ) : (
                        <p>No allergies found.</p>
                    )}
                </ul>
            )}
        </div>
    );
}

export default ManageAllergies;
