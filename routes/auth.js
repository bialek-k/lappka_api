const express = require('express');

const loginController = require('../controllers/auth')

const router = express.Router();


router.post('/auth/loginWeb', loginController.login)
router.post('/auth/useToken', loginController.refreshToken);


module.exports = router;