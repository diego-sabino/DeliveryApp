const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/users', UserController.getAllUsers);
router.post('/register', UserController.createUser);

module.exports = router;