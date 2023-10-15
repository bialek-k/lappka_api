const express = require("express");

const shelterController = require('../controllers/shleterStatsController')

const router = express.Router();
const authenticate = require('../utils/authenticate');


router.get('/shelters/stats', authenticate, shelterController.getShelterStats);

module.exports = router;
