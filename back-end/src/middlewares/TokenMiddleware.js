const jwt = require('jsonwebtoken');
const fs = require('fs');

const jwtKey = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  jwt.verify(authorization, jwtKey, (err, _decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
  });
  next();
};

const validateAdmin = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { data: { role } } = jwt.decode(authorization, jwtKey);
    if (!role || role !== 'administrator') {
      return res.status(401).json({
        message: 'You dont have this permission',
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = {
  validateToken,
  validateAdmin,
};
