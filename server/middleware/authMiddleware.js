const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');

const authMiddleware = async (req, res, next) => {
  let token;

  // Check for JWT token in Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // If no JWT token, check for session (Passport.js)
  if (!token && req.user) {
    req.user = { id: req.user._id };
    return next();
  }

  // If no token and no session, return unauthorized
  if (!token) {
    return res.status(401).json({ message: 'Access token missing or invalid' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    // Get user from database to ensure they still exist
    const user = await Patient.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = { id: user._id, ...user.toObject() };
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
