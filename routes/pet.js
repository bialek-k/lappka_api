const express = require('express');
const petController = require('../controllers/pet')
const router = express.Router();

const authenticate = require('../utils/authenticate');

router.get('/pet', petController.pet)
router.post('/createPet', authenticate, petController.createPet);



module.exports = router;