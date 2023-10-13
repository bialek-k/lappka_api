const express = require('express');
const multer = require('multer');

const fileUpload = multer()

const storageController = require('../controllers/storage');

const router = express.Router();

router.post('/storage/images', fileUpload.array('image'), storageController.uploadImages)

module.exports = router;