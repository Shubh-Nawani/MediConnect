const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if patient already exists
    let patient = await Patient.findOne({ email });
    if (patient) {
      if (patient.provider === 'google') {
        return res.status(400).json({ 
          message: 'An account with this email already exists. Please sign in with Google.' 
        });
      }
      return res.status(400).json({ message: 'Patient already exists' });
    }

    // Validate password for local registration
    if (!password || password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    patient = await Patient.create({
      name,
      email,
      password: hashedPassword,
      provider: 'local',
      isVerified: false,
    });

    const token = generateToken(patient._id);

    res.status(201).json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      avatar: patient.avatar,
      provider: patient.provider,
      isVerified: patient.isVerified,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    // Check if user registered with OAuth
    if (patient.provider === 'google' && !patient.password) {
      return res.status(400).json({ 
        message: 'This account was created with Google. Please sign in with Google.' 
      });
    }

    // For local accounts, verify password
    if (patient.provider === 'local' || patient.password) {
      const isMatch = await bcrypt.compare(password, patient.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }

    const token = generateToken(patient._id);

    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      avatar: patient.avatar,
      provider: patient.provider,
      isVerified: patient.isVerified,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select('-password');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const patient = await Patient.findById(req.user.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== patient.email) {
      const existingPatient = await Patient.findOne({ email });
      if (existingPatient) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
    }

    patient.name = name || patient.name;
    patient.email = email || patient.email;
    
    await patient.save();

    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      avatar: patient.avatar,
      provider: patient.provider,
      isVerified: patient.isVerified,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
