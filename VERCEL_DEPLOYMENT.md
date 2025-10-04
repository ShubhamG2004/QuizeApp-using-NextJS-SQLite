# Vercel Deployment Guide

This QuizApp is now configured for deployment on Vercel instead of Netlify.

## Deployment Instructions

### 1. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### 2. Deploy to Vercel
```bash
# Login to Vercel (if not already logged in)
vercel login

# Deploy the application
vercel

# Follow the prompts:
# - Set up and deploy project? Y
# - Which scope? (select your account)
# - Link to existing project? N (for first deployment)
# - What's your project's name? (default: QuizeApp)
# - In which directory is your code located? ./ (default)
```

### 3. Configure Environment Variables (Optional)
If you need to set environment variables:
```bash
vercel env add REACT_APP_API_URL
```

### 4. Production Deployment
For production deployment:
```bash
vercel --prod
```

## Project Structure for Vercel

- `api/` - Contains Vercel serverless functions
- `client/` - React frontend application
- `vercel.json` - Vercel configuration file
- `.vercelignore` - Files to ignore during deployment

## API Endpoints

The following API endpoints are available:

- `GET /api/quiz/questions` - Fetch all quiz questions
- `POST /api/quiz/submit` - Submit quiz answers and get results
- `GET /api/quiz/health` - Health check endpoint

## Local Development

To run the application locally:

```bash
# Install dependencies
npm run install-deps

# Start development server
npm run dev
```

The React app will run on `http://localhost:3000` and the API will be available at `/api/quiz/*` routes.

## Changes from Netlify

1. Replaced `netlify.toml` with `vercel.json`
2. Moved functions from `netlify/functions/` to `api/`
3. Updated function handler format for Vercel
4. Changed build script from `netlify-build` to `vercel-build`
5. Added `.vercelignore` file

## Notes

- Vercel automatically detects React applications and builds them
- The API functions are serverless and will scale automatically
- Environment variables can be set in the Vercel dashboard or via CLI