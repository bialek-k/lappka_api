const express = require('express');

const petController = require('../controllers/pet')

const router = express.Router();

router.get('/pet', petController.pet)


module.exports = router;