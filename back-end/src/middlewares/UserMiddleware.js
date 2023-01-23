const validateName = async (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length < 12) {
    return res.status(400).json({ message: 'Name must be at least 12 characters' });
  }
  next();
};
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email || !regex.test(email)) {
    return res.status(400).json({ message: 'Invalid email' });
}
  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }
  next();
};

module.exports = { validateName, validateEmail, validatePassword };