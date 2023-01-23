const express = require('express');
const LoginController = require('../controllers/LoginController');
const LoginMiddleware = require('../middlewares/LoginMiddleware');

const router = express.Router();

router.post('/login', LoginMiddleware.regexEmail, LoginMiddleware.isPasswordValid, LoginController.login);

module.exports = router;