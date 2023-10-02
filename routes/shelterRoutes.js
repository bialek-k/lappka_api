const express = require("express");

const shelterController = require("../controllers/shelterController");

const router = express.Router();

router.get('/shelterstats', shelterController.getShelterStats);

module.exports = router;
