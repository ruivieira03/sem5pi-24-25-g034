const express = require('express');
const allergyController = require('../controllers/allergyController');
const authenticate = require('../api/middleware/authenticate');

const router = express.Router();

router.get('/', authenticate(['Doctor', 'Admin']), allergyController.getAllAllergies);
router.get('/name/:name', authenticate(['Admin', 'Doctor']), allergyController.getAllergyByName);
router.post('/', authenticate(['Admin']), allergyController.createAllergy);
router.put('/:domainId', authenticate(['Admin']), allergyController.updateAllergy);
router.patch('/:domainId', authenticate(['Admin']), allergyController.softDeleteAllergy);

module.exports = router;
