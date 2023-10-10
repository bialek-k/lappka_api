const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })


//Controller
const storageController = require('../controllers/storage');

const router = express.Router();

router.post('/storage/images', upload.array('image'), storageController.uploadImages)

module.exports = router;