const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const connectDB = require('./config/db');
const patientRoutes = require('./routes/patientRoutes');
const testRoutes = require('./routes/testRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

dotenv.config();

// Load Passport configuration
require('./config/passport');
const passport = require('passport');

const app = express();

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Session configuration for Passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'mediconnect_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS in production
    httpOnly: true, // Prevent XSS attacks
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // CORS in production
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    try {
        return res.status(200).json({message: "MediConnect API is up & running..."})
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
    try {
        await connectDB()
        console.log(`Server is listening on http://localhost:${PORT}`)
    } catch (err) {
        console.error(err.message)
    }
})