# OAuth Setup Guide for MediConnect

This guide will help you set up OAuth authentication with Google for your MediConnect application.

## Prerequisites

- A Google account
- Your application running on `http://localhost:5173` (frontend) and `http://localhost:8000` (backend)

## Google OAuth Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Name it "MediConnect" or similar

### 2. Enable Google+ API

1. Go to "APIs & Services" > "Library"
2. Search for "Google+ API" and enable it
3. Also enable "Google Identity" API

### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client ID"
3. Choose "Web application"
4. Set name as "MediConnect Web Client"
5. Add Authorized JavaScript origins:
   - `http://localhost:5173`
   - `http://localhost:8000`
6. Add Authorized redirect URIs:
   - `http://localhost:8000/api/auth/google/callback`
7. Click "Create"
8. Copy the Client ID and Client Secret

### 4. Update Environment Variables

Add to your `.env` file in the server directory:
```bash
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

## Complete Environment Configuration

Your server `.env` file should look like this:

```bash
PORT=8000
MONGO_URI=mongodb+srv://shubhnawanis65:Nawani1234@kalvium-projects.hrv73.mongodb.net/MediConnect
JWT_SECRET=3ab0483de6fa6e8919d1c469fe467ea2a1b831437fa806592ee1cd96e5104bc4

# Session Secret for Passport.js
SESSION_SECRET=mediconnect_session_secret_2024_secure_key

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_actual_google_client_id
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

# Client URL (for OAuth redirects)
CLIENT_URL=http://localhost:5173

# Environment
NODE_ENV=development
```

## Testing OAuth

1. Start your server: `npm run dev` (in server directory)
2. Start your client: `npm run dev` (in client directory)
3. Go to `http://localhost:5173/login`
4. Try the "Sign in with Google" button

## Production Setup

For production, update the URLs in your OAuth app configurations:

### Google Cloud Console
- Replace `localhost:5173` with your production frontend URL
- Replace `localhost:8000` with your production backend URL

### Environment Variables
Update your production environment variables:
```bash
CLIENT_URL=https://your-frontend-domain.com
GOOGLE_CALLBACK_URL=https://your-backend-domain.com/api/auth/google/callback
```

## Features Implemented

✅ **Google OAuth 2.0** - Sign in with Google account  
✅ **Secure JWT Tokens** - JWT-based authentication  
✅ **Session Management** - Passport.js session handling  
✅ **Account Security** - Login attempt limiting and account locking  
✅ **Provider Detection** - Dynamic OAuth provider availability  
✅ **Error Handling** - Comprehensive error handling for OAuth flows  
✅ **User Profile Management** - OAuth profile data integration  

## Troubleshooting

### Common Issues

1. **OAuth redirect errors**: Check your callback URLs match exactly
2. **CORS errors**: Ensure your frontend URL is in authorized origins
3. **Missing user data**: Check the OAuth scopes requested
4. **Database errors**: Ensure MongoDB connection is working

### Debug Mode

Set `NODE_ENV=development` to enable debug logging for OAuth flows.

## Security Notes

- Never commit your OAuth secrets to version control
- Use different OAuth apps for development and production
- Regularly rotate your OAuth secrets
- Implement proper HTTPS in production
- Consider implementing OAuth token refresh for long-term access

## API Endpoints

### OAuth Routes
- `GET /api/auth/google` - Start Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/providers` - Get available OAuth providers
- `GET /api/auth/logout` - Logout user

### User Management
- `GET /api/auth/user` - Get current authenticated user
- `GET /api/patients/profile` - Get user profile (requires auth)
- `PUT /api/patients/profile` - Update user profile (requires auth)
