const express = require('express');

//Controller
const storageController = require('../controllers/storage');

const router = express.Router();

router.post('/storage/images', storageController.uploadImages)

module.exports = router;