// Check if required dependencies are available
let passport, GoogleStrategy, LocalStrategy, bcrypt, Patient;

try {
    passport = require('passport');
    GoogleStrategy = require('passport-google-oauth20').Strategy;
    LocalStrategy = require('passport-local').Strategy;
    bcrypt = require('bcryptjs');
    Patient = require('../models/Patient');
} catch (error) {
    console.error('Passport dependencies not available:', error.message);
    module.exports = null;
    return;
}

// Only configure if all dependencies are loaded
if (passport && GoogleStrategy && LocalStrategy && bcrypt && Patient) {

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Patient.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Local Strategy for username/password authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await Patient.findOne({ email });
        
        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        // Check if user registered with OAuth only
        if (user.provider !== 'local' && !user.password) {
          return done(null, false, { 
            message: `This account was created with ${user.provider}. Please sign in with ${user.provider}.` 
          });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this Google ID
        let existingUser = await Patient.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        // Check if user exists with same email but different provider
        existingUser = await Patient.findOne({ email: profile.emails[0].value });

        if (existingUser) {
          // Link Google account to existing user
          existingUser.googleId = profile.id;
          existingUser.avatar = profile.photos[0]?.value;
          existingUser.provider = 'google';
          existingUser.isVerified = true;
          await existingUser.save();
          return done(null, existingUser);
        }

        // Create new user
        const newUser = await Patient.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0]?.value,
          provider: 'google',
          isVerified: true,
        });

        done(null, newUser);
      } catch (error) {
        console.error('Google OAuth error:', error);
        done(error, null);
      }
    }
  )
);

} // End of conditional block

module.exports = passport || null;
