const express = require('express');
const petController = require('../controllers/pet')
const router = express.Router();

const verifyToken = require('../utils/verifyToken');


router.use(verifyToken);

router.get('/pet', petController.pet)
router.post('/createPet', verifyToken, petController.createPet);


module.exports = router;