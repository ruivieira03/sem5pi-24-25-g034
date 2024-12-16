const Allergy = require('../models/allergyModel');

// Get all allergies
exports.getAllAllergies = async (req, res) => {
    try {
        const allergies = await Allergy.findAll();
        res.status(200).json(allergies);
    } catch (error) {
        console.error('Error fetching allergies:', error);
        res.status(500).json({ message: 'Error fetching allergies', error });
    }
};

// Get a single allergy by ID
exports.getAllergyById = async (req, res) => {
    try {
        const allergy = await Allergy.findByPk(req.params.id);
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

        // Ensure name is provided
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        // Create the allergy
        const newAllergy = await Allergy.create({ name, description });
        res.status(201).json(newAllergy);
    } catch (error) {
        console.error('Error creating allergy:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Allergy name must be unique' });
        }
        res.status(500).json({ message: 'Error creating allergy', error });
    }
};

// Update an existing allergy
exports.updateAllergy = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Find the allergy by ID
        const allergy = await Allergy.findByPk(req.params.id);
        if (!allergy) {
            return res.status(404).json({ message: 'Allergy not found' });
        }

        // Update the allergy details
        await allergy.update({ name, description });
        res.status(200).json(allergy);
    } catch (error) {
        console.error('Error updating allergy:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Allergy name must be unique' });
        }
        res.status(500).json({ message: 'Error updating allergy', error });
    }
};

// Delete an allergy
exports.deleteAllergy = async (req, res) => {
    try {
        // Find the allergy by ID
        const allergy = await Allergy.findByPk(req.params.id);
        if (!allergy) {
            return res.status(404).json({ message: 'Allergy not found' });
        }

        // Delete the allergy
        await allergy.destroy();
        res.status(200).json({ message: 'Allergy deleted successfully' });
    } catch (error) {
        console.error('Error deleting allergy:', error);
        res.status(500).json({ message: 'Error deleting allergy', error });
    }
};
