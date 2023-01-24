const md5 = require('md5');
const jwt = require('jsonwebtoken');
const service = require('../services/UserService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await (await service.findUserByEmail(email)).message;
  const { name, role } = user;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  if (!user) {
    return res.status(404).json({ message: 'Not found' });
  }
  if (user.password !== md5(password)) {
    return res.status(404).json({ message: 'Wrong password' });
  }

  const secret = process.env.JWT_SECRET || 'secret_key';
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { name, email, role } }, secret, jwtConfig);

  return res.status(200).json({ name, email, role, token });
};

module.exports = {
  login,
};