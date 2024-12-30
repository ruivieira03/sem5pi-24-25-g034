const express = require('express');
const allergyController = require('../controllers/allergyController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate(['Doctor', 'Admin']), allergyController.getAllAllergies);
router.get('/name/:name', authenticate(['Admin', 'Doctor']), allergyController.getAllergyByName);
router.post('/', authenticate(['Admin']), allergyController.createAllergy);
router.put('/:id', authenticate(['Admin']), allergyController.updateAllergy);
router.delete('/:id', authenticate(['Admin']), allergyController.deleteAllergy);

module.exports = router;
