const jwt = require("jsonwebtoken");
const { secretKey } = require("../Config");

// Middleware to generate a JWT token upon successful login
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

// Middleware to authenticate a user using a JWT token
function authenticateUser(req, res, next) {
  const token = req.header("x-auth-token");
  console.log("Token:", token); // Debugging line

  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded Token:", decoded); // Debugging line
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

module.exports = { generateToken, authenticateUser };
