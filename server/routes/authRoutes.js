const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

// Helper function to handle OAuth success
const handleOAuthSuccess = (req, res) => {
  try {
    // Update last login
    req.user.lastLogin = new Date();
    req.user.save();

    // Generate JWT token for the authenticated user
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token
    const frontendURL = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${frontendURL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      provider: req.user.provider
    }))}`);
  } catch (error) {
    console.error('OAuth success handler error:', error);
    const frontendURL = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${frontendURL}/login?error=oauth_callback_failed`);
  }
};

// @route   GET /api/auth/google
// @desc    Start Google OAuth process
// @access  Public
router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=oauth_failed` 
  }),
  handleOAuthSuccess
);

// @route   POST /api/auth/local
// @desc    Local authentication
// @access  Public
router.post('/local',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    try {
      // Update last login and reset login attempts
      req.user.lastLogin = new Date();
      req.user.resetLoginAttempts();
      req.user.save();

      const token = generateToken(req.user._id);
      
      res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        provider: req.user.provider,
        isVerified: req.user.isVerified,
        token,
      });
    } catch (error) {
      console.error('Local auth error:', error);
      res.status(500).json({ message: 'Authentication failed' });
    }
  }
);

// @route   GET /api/auth/logout
// @desc    Logout user
// @access  Public
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// @route   GET /api/auth/user
// @desc    Get current authenticated user
// @access  Private
router.get('/user', (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      provider: req.user.provider,
      isVerified: req.user.isVerified
    });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// @route   GET /api/auth/providers
// @desc    Get available OAuth providers
// @access  Public
router.get('/providers', (req, res) => {
  const providers = [];
  
  if (process.env.GOOGLE_CLIENT_ID) {
    providers.push({
      name: 'google',
      displayName: 'Google',
      authUrl: '/api/auth/google',
      enabled: true
    });
  }

  res.json({ providers });
});

module.exports = router;
