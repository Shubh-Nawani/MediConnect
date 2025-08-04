const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Generates JWT token for patient authentication
 * @param {String} id - Patient ID
 * @returns {String} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

/**
 * Register a new patient with local authentication
 * @route POST /api/patients/register
 * @access Public
 */
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if patient already exists with this email
    let patient = await Patient.findOne({ email });
    if (patient) {
      if (patient.provider === 'google') {
        return res.status(400).json({ 
          message: 'An account with this email already exists. Please sign in with Google.' 
        });
      }
      return res.status(400).json({ message: 'Patient already exists' });
    }

    // Validate password requirements
    if (!password || password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Hash password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new patient record
    patient = await Patient.create({
      name,
      email,
      password: hashedPassword,
      provider: 'local',
      isVerified: false,
    });

    // Generate authentication token
    const token = generateToken(patient._id);

    // Return patient data with token
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

/**
 * Authenticate patient login
 * @route POST /api/patients/login
 * @access Public
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find patient by email
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    // Check if user registered with OAuth only
    if (patient.provider === 'google' && !patient.password) {
      return res.status(400).json({ 
        message: 'This account was created with Google. Please sign in with Google.' 
      });
    }

    // Verify password for local accounts
    if (patient.provider === 'local' || patient.password) {
      const isMatch = await bcrypt.compare(password, patient.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }

    // Generate authentication token
    const token = generateToken(patient._id);

    // Return patient data with token
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

/**
 * Get patient profile information
 * @route GET /api/patients/profile
 * @access Private
 */
const getProfile = async (req, res) => {
  try {
    // Find patient and exclude password from response
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

/**
 * Update patient profile information
 * @route PUT /api/patients/profile
 * @access Private
 */
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

    // Update patient information
    patient.name = name || patient.name;
    patient.email = email || patient.email;
    
    await patient.save();

    // Return updated patient data
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

// Export controller functions
module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
