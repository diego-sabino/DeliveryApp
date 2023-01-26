const express = require('express');
const UserController = require('../controllers/UserController');
const UserMiddleware = require('../middlewares/UserMiddleware');
const TokenMiddleware = require('../middlewares/TokenMiddleware');
const router = express.Router();

router.get('/users', UserController.getAllUsers);
router.post(
  '/register',
  UserMiddleware.validateName,
  UserMiddleware.validateEmail,
  UserMiddleware.validatePassword,
  UserController.createUser,
);

router.post(
  '/admin/register',
  TokenMiddleware.validateAdmin,
  UserMiddleware.validateName,
  UserMiddleware.validateEmail,
  UserMiddleware.validatePassword,
  UserController.createUser,
);

module.exports = router;