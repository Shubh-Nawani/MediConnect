// Core dependencies for the Express server
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Conditional authentication loading for serverless compatibility
let passport, session;
try {
    // Only load OAuth authentication if Google credentials are configured
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
        session = require('express-session');
        passport = require('passport');
        
        // Load Passport configuration and verify it's working
        const passportConfig = require('./config/passport');
        if (!passportConfig) {
            passport = null;
            console.warn('Passport configuration failed - disabling OAuth');
        } else {
            console.log('OAuth authentication enabled');
        }
    } else {
        console.log('OAuth credentials not found - disabling OAuth');
    }
} catch (error) {
    console.warn('Authentication modules not loaded:', error.message);
}

/**
 * Ensures database connection is established and reuses existing connections
 * Optimized for serverless environments to prevent connection exhaustion
 */
async function ensureDBConnection() {
    try {
        // Check if we already have an active database connection
        if (!global.mongoose || !global.mongoose.connection || global.mongoose.connection.readyState === 0) {
            const connectDB = require('./config/db');
            global.mongoose = await connectDB();
        }
        return global.mongoose;
    } catch (error) {
        console.error('Database connection error:', error.message);
        throw error;
    }
}

// Configure CORS for secure cross-origin requests
app.use(cors({
    origin: [
        'http://localhost:5173',                      // Local development frontend
        'http://localhost:3000',                      // Alternative local port
        'https://client-mediconnect.vercel.app'      // Production frontend domain
    ],
    credentials: true,  // Allow cookies for OAuth sessions
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] // Allowed HTTP methods
}));

// Configure Express middleware for request parsing
app.use(express.json({ limit: '10mb' })); // Parse JSON requests with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded data

// Serve static files from public directory
app.use('/public', express.static('public'));

// Setup authentication middleware only if OAuth modules are available
if (session && passport) {
    // Configure session management for OAuth flows
    app.use(session({
        secret: process.env.SESSION_SECRET || 'mediconnect_session_secret',
        resave: false,              // Don't save session if unmodified
        saveUninitialized: false,   // Don't create session until something stored
        cookie: {
            secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
            httpOnly: true,                                 // Prevent XSS attacks
            maxAge: 24 * 60 * 60 * 1000,                   // 24 hours expiration
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        }
    }));

    // Initialize Passport authentication middleware
    app.use(passport.initialize());
    app.use(passport.session());
} else {
    console.log('Authentication middleware disabled - OAuth credentials not found');
}

/**
 * Basic root endpoint
 */
app.get('/', (req, res) => {
    res.json({
        message: 'MediConnect API Server',
        status: 'running',
        timestamp: new Date().toISOString()
    });
});

/**
 * Database connection middleware for all API routes
 * Ensures database is connected before processing requests
 */
app.use('/api', async (req, res, next) => {
    try {
        // Ensure database connection before processing API requests
        await ensureDBConnection();
        next();
    } catch (error) {
        console.error('Database connection failed:', error.message);
        return res.status(503).json({
            error: 'Database temporarily unavailable',
            message: 'Please try again later'
        });
    }
});

/**
 * Load and configure API routes
 * Each route module handles specific functionality
 */
try {
    // Import route modules
    const patientRoutes = require('./routes/patientRoutes');
    const testRoutes = require('./routes/testRoutes');
    const bookingRoutes = require('./routes/bookingRoutes');
    
    // Mount routes with appropriate prefixes
    app.use('/api/patients', patientRoutes);    // Patient registration & profile management
    app.use('/api/tests', testRoutes);          // Lab tests catalog endpoints
    app.use('/api/bookings', bookingRoutes);    // Test bookings & reports management

    // Load OAuth routes only if authentication is configured
    if (passport) {
        const authRoutes = require('./routes/authRoutes');
        app.use('/api/auth', authRoutes);       // OAuth authentication endpoints
        console.log('OAuth routes loaded successfully');
    } else {
        // Provide fallback endpoints when OAuth is not configured
        app.get('/api/auth/status', (req, res) => {
            res.json({ 
                authenticated: false, 
                message: 'OAuth disabled - missing credentials',
                availableProviders: []
            });
        });
        
        app.get('/api/auth/providers', (req, res) => {
            res.json({ 
                providers: [],
                message: 'OAuth providers unavailable - missing environment variables'
            });
        });
        
        app.get('/api/auth/google', (req, res) => {
            res.status(503).json({
                error: 'OAuth not configured',
                message: 'Google OAuth credentials not found'
            });
        });
        
        console.log('OAuth routes disabled - using fallback endpoints');
    }
} catch (error) {
    console.error('Failed to load routes:', error.message);
    
    // Provide minimal fallback for route loading failures
    app.get('/api/*', (req, res) => {
        res.status(503).json({
            error: 'Service temporarily unavailable',
            message: 'Routes failed to load'
        });
    });
}

/**
 * Global error handling middleware
 * Catches and formats all unhandled errors
 */
app.use((error, req, res, next) => {
    console.error('Server error:', error.message);
    return res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

/**
 * 404 handler for undefined routes
 * Must be the last middleware
 */
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `${req.method} ${req.originalUrl} does not exist`
    });
});

// Server configuration
const PORT = process.env.PORT || 8000;

/**
 * Export app for Vercel serverless deployment
 * or start local server for development
 */
if (process.env.VERCEL) {
    // Export app for Vercel serverless functions
    module.exports = app;
} else {
    // Start local development server
    app.listen(PORT, () => {
        console.log(`MediConnect server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`API URL: http://localhost:${PORT}`);
    });
}
