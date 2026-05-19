const jwt = require('jsonwebtoken');

// Returns a signed JWT valid for 7 days
const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

module.exports = generateToken;
