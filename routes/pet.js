const express = require('express');
const petController = require('../controllers/pet')
const router = express.Router();

const multer = require('multer')
const upload = multer();

const authenticate = require('../utils/authenticate');

router.get('/shelter/pet', petController.getPet)
router.get('/shelter/paginatedPetList', petController.paginatedPetList )
router.post('/shelters/cards/createpet', authenticate, upload.array('image'), petController.createPet);
router.delete('/shelter/delete/pet',authenticate, petController.deletePet);


module.exports = router;