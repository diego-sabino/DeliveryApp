const md5 = require('md5');
const service = require('../services/UserService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await (await service.findUser(email)).message.dataValues;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  if (!user || user.password !== md5(password)) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(200).json({ message: 'Login Successfull!' });
};

module.exports = {
  login,
};