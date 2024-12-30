const Allergy = require('../models/allergyModel');
const mongoose = require('mongoose'); // Import mongoose to validate ObjectId

// Get all allergies with pagination
exports.getAllAllergies = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Get pagination params from query
        const skip = (page - 1) * limit;

        const allergies = await Allergy.find().skip(skip).limit(parseInt(limit));
        const total = await Allergy.countDocuments();

        res.status(200).json({
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            data: allergies,
        });
    } catch (error) {
        console.error('Error fetching allergies:', error);
        res.status(500).json({ message: 'Error fetching allergies', error });
    }
};

// Get a single allergy by name
exports.getAllergyByName = async (req, res) => {
    try {
        const { name } = req.params; // Get the name from the route parameter

        const allergy = await Allergy.findOne({ name }); // Search for the allergy by name
        if (!allergy) {
            return res.status(404).json({ message: 'Allergy not found' });
        }

        res.status(200).json(allergy);
    } catch (error) {
        console.error('Error fetching allergy:', error);
        res.status(500).json({ message: 'Error fetching allergy', error });
    }
};

// Create a new allergy
exports.createAllergy = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate input
        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        // Create the allergy
        const newAllergy = new Allergy({ name, description });
        await newAllergy.save();

        res.status(201).json(newAllergy);
    } catch (error) {
        console.error('Error creating allergy:', error);
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ message: 'Allergy name must be unique' });
        }
        res.status(500).json({ message: 'Error creating allergy', error });
    }
};

// Update an existing allergy
exports.updateAllergy = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the route
        const { name, description } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Allergy ID is required' });
        }

        const allergy = await Allergy.findById(id); // Find the allergy by ID
        if (!allergy) {
            return res.status(404).json({ message: 'Allergy not found' });
        }

        // Update the allergy details
        allergy.name = name || allergy.name;
        allergy.description = description || allergy.description;

        await allergy.save(); // Save the updated allergy
        res.status(200).json(allergy);
    } catch (error) {
        console.error('Error updating allergy:', error);
        res.status(500).json({ message: 'Error updating allergy', error });
    }
};

// Delete an allergy
exports.deleteAllergy = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Attempting to delete allergy with ID:', id);

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid allergy ID format' });
        }

        const result = await Allergy.findByIdAndDelete(id);
        if (!result) {
            console.log('Allergy not found with ID:', id);
            return res.status(404).json({ message: 'Allergy not found' });
        }

        res.status(200).json({ message: 'Allergy deleted successfully' });
    } catch (error) {
        console.error('Error deleting allergy:', error);
        res.status(500).json({ 
            message: 'Error deleting allergy', 
            error: error.message || 'Unknown error occurred' 
        });
    }
};


