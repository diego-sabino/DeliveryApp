const regexEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email || !regex.test(email)) {
    return res.status(400).json({ message: 'Invalid email' });
}
  next();
};

const isPasswordValid = async (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length <= 6) {
    return res.status(400).json({ message: 'senha no formato incorreto' });
  }
  next();
};

module.exports = { isPasswordValid, regexEmail };