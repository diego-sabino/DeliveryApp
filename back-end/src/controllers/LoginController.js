const md5 = require('md5');
const service = require('../services/UserService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await (await service.findUserByEmail(email)).message;
  const { role } = user;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  if (!user) {
    return res.status(404).json({ message: 'Not found' });
  }
  if (user.password !== md5(password)) {
    return res.status(404).json({ message: 'Wrong password' });
  }

  return res.status(200).json({ role });
};

module.exports = {
  login,
};