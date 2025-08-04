#!/bin/bash

# MediConnect Deployment Helper Script
echo "🚀 MediConnect Production Deployment Helper"
echo "=========================================="

echo ""
echo "📋 Pre-deployment Checklist:"
echo "✅ All production config files created"
echo "✅ Environment variables templates ready"
echo "✅ Vercel configuration files created"
echo "✅ CORS updated for production"
echo ""

echo "📖 Next Steps:"
echo "1. Go to https://vercel.com and sign in"
echo "2. Create TWO separate projects:"
echo "   - Project 1: Backend (server folder)"
echo "   - Project 2: Frontend (client folder)"
echo ""

echo "🔧 Environment Variables to Add in Vercel:"
echo ""
echo "Backend Project:"
echo "----------------"
cat server/.env.production
echo ""

echo "Frontend Project:"
echo "-----------------"
cat client/.env.production
echo ""

echo "⚠️  IMPORTANT:"
echo "- Replace 'your-backend-domain' and 'your-frontend-domain' with actual Vercel URLs"
echo "- Update Google OAuth settings with production URLs"
echo "- Test the complete application after deployment"
echo ""

echo "📚 For detailed instructions, see:"
echo "- DEPLOYMENT.md"
echo "- PRODUCTION_CHECKLIST.md"
echo ""

echo "🎉 Your MediConnect app is ready for production deployment!"
