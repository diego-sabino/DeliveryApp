const jwt = require('jsonwebtoken');
const service = require('../services/UserService');
const errorMap = require('../utils/ErrorMap');

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await service.findUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  return res.status(200).json(user);
};

const getAllUsers = async (_req, res) => {
  const users = await service.findAllUsers();

  return res.status(200).json(users.message);
};

const createUser = async (req, res) => {
  const { name, email, role } = req.body;

  const newUser = await service.createUser(req.body);
  
  const secret = process.env.JWT_SECRET || 'secret_key';
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { name, email, role } }, secret, jwtConfig);

  if (newUser.type) {
    return res.status(errorMap.mapError(newUser.type)).json(newUser.message);
  }

  return res.status(201).json({ token });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};