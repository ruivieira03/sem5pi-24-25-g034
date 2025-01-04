const express = require('express');
const medicalConditionController = require('../controllers/medicalConditionController');
const authenticate = require('../api/middleware/authenticate');

const router = express.Router();

router.get('/', authenticate(['Doctor', 'Admin']), medicalConditionController.getAllMedicalConditions);
router.get('/name/:name', authenticate(['Admin', 'Doctor']), medicalConditionController.getMedicalConditionByName);
router.post('/', authenticate(['Admin']), medicalConditionController.createMedicalCondition);
router.put('/:domainId', authenticate(['Admin']), medicalConditionController.updateMedicalCondition);
router.patch('/:domainId', authenticate(['Admin']), medicalConditionController.softDeleteMedicalCondition);

module.exports = router;
