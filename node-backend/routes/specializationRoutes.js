const express = require('express');
const specializationController = require('../controllers/specializationController');
const authenticate = require('../api/middleware/authenticate');

const router = express.Router();

router.get('/', authenticate(['Doctor', 'Admin']), specializationController.getAllSpecializations);
router.get('/name/:name', authenticate(['Admin', 'Doctor']), specializationController.getSpecializationByName);
router.post('/', authenticate(['Admin']), specializationController.createSpecialization);
router.put('/:domainId', authenticate(['Admin']), specializationController.updateSpecialization);
router.patch('/:domainId', authenticate(['Admin']), specializationController.softDeleteSpecialization);

module.exports = router;
