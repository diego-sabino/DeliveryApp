const express = require('express');
const LoginController = require('../controllers/LoginController');
const UserMiddleware = require('../middlewares/UserMiddleware');

const router = express.Router();

router.post(
  '/login',
  UserMiddleware.validateEmail,
  UserMiddleware.validatePassword,
  LoginController.login
);

module.exports = router;