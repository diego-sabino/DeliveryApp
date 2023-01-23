const md5 = require('md5');
const { User } = require('../database/models');

const findUserById = async (id) => {
  const result = await User.findByPk(id);
  
  if (result) {
    delete result.dataValues.password;
  }

  return result;
};

const findUserByName = async (name) => {
  const singleUser = await User.findOne({ where: { name } });

  if (!singleUser) {
    return { type: 'USER_NOT_FOUND', message: 'Invalid fields' };
  }

  return { type: null, message: singleUser };
};

const findUserByEmail = async (email) => {
  const singleUser = await User.findOne({ where: { email } });

  if (!singleUser) {
    return { type: 'USER_NOT_FOUND', message: 'Invalid fields' };
  }

  return { type: null, message: singleUser };
};

const findAllUsers = async () => {
  const users = await User.findAll();
  const usersHandler = users.map((user) => user.dataValues);
  usersHandler.forEach((elem) => {
    const element = elem;
    delete element.password;
  });

  return { type: null, message: usersHandler };
};

const createUser = async (user) => {
  const { name, email, role, password } = user;

  const passwordHash = md5(password);

  const newUser = await User.create({ name, email, role, password: passwordHash });

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