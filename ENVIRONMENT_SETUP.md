# 🔐 Environment Variables Setup

## ⚠️ Security Notice
**NEVER commit actual .env files to Git!** This repository is configured to automatically ignore all environment files.

## 📋 Setup Instructions

### 1. Server Environment Variables
```bash
# Navigate to server directory
cd server

# Copy the template file
cp .env.template .env

# Edit .env with your actual values
# Use a secure text editor to fill in real credentials
```

### 2. Client Environment Variables
```bash
# Navigate to client directory  
cd client

# Copy the template file
cp .env.template .env

# Edit .env with your actual values
```

### 3. Required Environment Files

#### Development:
- `server/.env` (from `server/.env.template`)
- `client/.env` (from `client/.env.template`)

#### Production (Vercel):
- Set environment variables directly in Vercel dashboard
- Never commit production credentials to Git

## 🔧 Environment Variables Reference

### Server (.env)
```env
NODE_ENV=development
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secure_jwt_secret_min_32_chars
SESSION_SECRET=your_super_secure_session_secret_min_32_chars
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback
CLIENT_URL=http://localhost:5173
```

### Client (.env)
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=MediConnect
VITE_APP_ENV=development
```

## 🛡️ Security Best Practices

1. **Never commit .env files** - They contain sensitive credentials
2. **Use strong secrets** - Generate random strings for JWT_SECRET and SESSION_SECRET
3. **Rotate credentials** - Change secrets periodically
4. **Environment separation** - Use different credentials for development/production
5. **Access control** - Limit who has access to production environment variables

## ✅ Git Ignore Status

The following patterns are ignored by Git:
- `.env`
- `.env.*`
- `.env.local`
- `.env.development`
- `.env.production`
- `.env.staging`
- `.env.test`
- `**/.env` (all .env files in any subdirectory)

## 🚀 Deployment

For production deployment on Vercel:
1. Set environment variables in Vercel dashboard
2. Never commit production .env files
3. Use the values from `.env.template` files as reference

## 🆘 Troubleshooting

**Problem**: Getting "Environment variable not found" errors
**Solution**: Ensure you've copied and filled out the .env files from templates

**Problem**: OAuth not working
**Solution**: Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correctly set

**Problem**: Database connection failed
**Solution**: Check your MONGO_URI is correct and accessible
