const express = require('express');
const allergyController = require('../controllers/allergyController');
const router = express.Router();

// Routes for managing allergies
router.get('/', allergyController.getAllAllergies); // Get all allergies
router.get('/:id', allergyController.getAllergyById); // Get allergy by ID
router.post('/', allergyController.createAllergy); // Create new allergy
router.put('/:id', allergyController.updateAllergy); // Update allergy by ID
router.delete('/:id', allergyController.deleteAllergy); // Delete allergy by ID

module.exports = router;
