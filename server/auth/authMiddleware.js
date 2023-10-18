const jwt = require('jsonwebtoken');
const { secretKey } = require('../Config'); // Store your secret key in a configuration file

// Middleware to generate a JWT token upon successful login
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

// Middleware to authenticate a user using a JWT token
function authenticateUser(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = { generateToken, authenticateUser };
