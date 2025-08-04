# MediConnect - Vercel Deployment Guide

## Prerequisites
- GitHub repository with your code
- Vercel account
- Google Cloud Console project for OAuth

## Deployment Steps

### 1. Backend Deployment (Server)

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository
   - Select the `server` folder as the root directory

2. **Configure Environment Variables:**
   Add these environment variables in Vercel dashboard:
   ```
   PORT=8000
   MONGO_URI=mongodb+srv://shubhnawanis65:Nawani1234@kalvium-projects.hrv73.mongodb.net/MediConnect
   JWT_SECRET=3ab0483de6fa6e8919d1c469fe467ea2a1b831437fa806592ee1cd96e5104bc4
   SESSION_SECRET=mediconnect_session_secret_2024_secure_key
   GOOGLE_CLIENT_ID=27092866319-1bgls0efo9vbf14n7pl9lkkvlu5nu7ka.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=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
   GOOGLE_CALLBACK_URL=https://your-backend-domain.vercel.app/api/auth/google/callback
   CLIENT_URL=https://your-frontend-domain.vercel.app
   NODE_ENV=production
   ```

3. **Deploy:**
   - Vercel will automatically detect the `vercel.json` configuration
   - Click "Deploy"
   - Note your backend URL (e.g., `https://mediconnect-server.vercel.app`)

### 2. Frontend Deployment (Client)

1. **Connect to Vercel:**
   - Create a new project in Vercel
   - Import your GitHub repository again
   - Select the `client` folder as the root directory

2. **Configure Environment Variables:**
   Add these environment variables in Vercel dashboard:
   ```
   VITE_API_BASE_URL=https://your-backend-domain.vercel.app/api
   VITE_APP_NAME=MediConnect
   VITE_APP_ENV=production
   ```

3. **Deploy:**
   - Vercel will automatically build using `npm run build`
   - Click "Deploy"
   - Note your frontend URL (e.g., `https://mediconnect-client.vercel.app`)

### 3. Update OAuth Configuration

1. **Google Cloud Console:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to "APIs & Services" > "Credentials"
   - Edit your OAuth 2.0 Client ID
   - Add authorized redirect URIs:
     - `https://your-backend-domain.vercel.app/api/auth/google/callback`
   - Add authorized JavaScript origins:
     - `https://your-frontend-domain.vercel.app`
     - `https://your-backend-domain.vercel.app`

2. **Update Environment Variables:**
   - Go back to both Vercel projects
   - Update the environment variables with actual domain names:
     - Backend: Update `CLIENT_URL` and `GOOGLE_CALLBACK_URL`
     - Frontend: Update `VITE_API_BASE_URL`

### 4. Final Steps

1. **Redeploy both projects** after updating environment variables
2. **Test the OAuth flow** on production domains
3. **Verify all API endpoints** are working correctly

## Important Notes

- **Domain Names:** Replace `your-backend-domain` and `your-frontend-domain` with actual Vercel-generated domains
- **Environment Variables:** Never commit production credentials to git
- **HTTPS:** Vercel automatically provides HTTPS for all deployments
- **Database:** Your MongoDB Atlas connection should work in production
- **Session Cookies:** Configured to work with HTTPS in production

## Troubleshooting

1. **OAuth Issues:** Check Google Cloud Console redirect URIs match exactly
2. **CORS Errors:** Verify CLIENT_URL in backend matches frontend domain
3. **API Errors:** Check environment variables are set correctly in Vercel
4. **Build Errors:** Check build logs in Vercel dashboard

## File Structure for Deployment

```
MediConnect/
├── client/               # Frontend (Deploy as separate Vercel project)
│   ├── vercel.json      # ✅ Created
│   ├── .env.production  # ✅ Created
│   └── package.json     # ✅ Has build script
└── server/              # Backend (Deploy as separate Vercel project)
    ├── vercel.json      # ✅ Created
    ├── .env.production  # ✅ Created
    └── package.json     # ✅ Updated with scripts
```

## Next Steps After Deployment

1. Get your actual Vercel domain names
2. Update environment variables with real domain names
3. Update Google OAuth settings with production URLs
4. Test the complete application flow
5. Set up custom domains (optional)
