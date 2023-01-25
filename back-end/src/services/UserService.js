const md5 = require('md5');
const { user } = require('../database/models');

const findUserById = async (id) => {
  const result = await user.findByPk(id);
  
  if (result) {
    delete result.dataValues.password;
  }

  return result;
};

const findUserByName = async (name) => {
  const singleUser = await user.findOne({ where: { name } });

  if (!singleUser) {
    return { type: 'USER_NOT_FOUND', message: 'Invalid fields' };
  }

  return { type: null, message: singleUser };
};

const findUserByEmail = async (email) => {
  const singleUser = await user.findOne({ where: { email } });

  if (!singleUser) {
    return { type: 'USER_NOT_FOUND', message: 'Invalid fields' };
  }

  return { type: null, message: singleUser };
};

const findAllUsers = async () => {
  const users = await user.findAll();
  const usersHandler = users.map((user) => user.dataValues);
  usersHandler.forEach((elem) => {
    const element = elem;
    delete element.password;
  });

  return { type: null, message: usersHandler };
};

const createUser = async (teste) => {
  const { name, email, role, password } = teste;

  const passwordHash = md5(password);

  const newUser = await user.create({ name, email, role, password: passwordHash });

  if (!newUser) {
    return { type: 'CREATE_USER_FAIL', message: 'User already exists' };
  }

  return { type: null, message: newUser };
};

module.exports = {
  findUserByName,
  findUserByEmail,
  createUser,
  findAllUsers,
  findUserById,
};