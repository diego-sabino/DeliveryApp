const jwt = require('jsonwebtoken');
const jwtKey = require('fs')
  .readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });
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
  const userNameAlreadyExists = await service.findUserByName(name);
  const userEmailAlreadyExists = await service.findUserByEmail(email);
  if (userNameAlreadyExists.type === null || userEmailAlreadyExists.type === null) {
    return res.status(409).json({ message: 'User already exists or invalid fields' });
  }
  const newUser = await service.createUser(req.body);
  if (newUser.type) {
    return res.status(errorMap.mapError(newUser.type)).json(newUser.message);
  }

  const {id} = newUser.message;
  
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { name, email, role } }, jwtKey, jwtConfig);
  return res.status(201).json({ id, name, email, role, token });
};
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};