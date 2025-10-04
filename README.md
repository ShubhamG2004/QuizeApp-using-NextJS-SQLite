# Online Quiz Application - Programming Edition

A full-stack programming quiz application built with React (frontend) and Node.js/Express (backend) with SQLite database.

## Features

### Core Features
- ✅ Start page to begin the programming quiz
- ✅ 20 programming-related questions covering various topics
- ✅ Question navigation with Next/Previous buttons
- ✅ Submit quiz and get score
- ✅ Results page showing final score

### Bonus Features
- ✅ Timer functionality (15 minutes)
- ✅ Detailed results showing correct/incorrect answers
- ✅ Backend tests for scoring logic

## Programming Topics Covered

- **JavaScript**: Data types, functions, async operations
- **Web Development**: HTML, CSS, HTTP, DOM, JSON
- **Python**: Frameworks (Django), exception handling
- **Databases**: SQL, NoSQL (MongoDB)
- **General Programming**: Time complexity, paradigms, Git
- **APIs**: REST concepts and status codes

## Tech Stack

**Frontend:**
- React 18
- React Router for navigation
- Axios for API calls
- CSS3 for styling

**Backend:**
- Node.js
- Express.js
- SQLite3 database
- Jest for testing

## Quick Start

### Option 1: Backend + HTML Demo (Currently Working)

1. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Start backend server:**
   ```bash
   cd server
   node src/index.js
   ```

3. **Open the demo:**
   - Open `demo.html` in your web browser
   - The demo connects to the backend API at http://localhost:5000

4. **Run tests:**
   ```bash
   cd server
   npm test
   ```

### Option 2: Full React Setup (Dependency Issues)

The React frontend currently has dependency compatibility issues with the latest Node.js version. To try the React version:

1. **Install all dependencies:**
   ```bash
   npm run install-deps
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```

   This should start:
   - Backend server on http://localhost:5000
   - Frontend server on http://localhost:3000 (if dependencies resolve)

## Project Structure

```
quiz-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── styles/        # CSS files
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   ├── tests/             # Test files
│   ├── database.db        # SQLite database
│   └── package.json
└── package.json           # Root package.json
```

## API Endpoints

- `GET /api/quiz/questions` - Fetch all quiz questions (without correct answers)
- `POST /api/quiz/submit` - Submit quiz answers and get score

## Database Schema

The SQLite database contains a `questions` table with:
- `id` (INTEGER PRIMARY KEY)
- `question_text` (TEXT)
- `option_a` (TEXT)
- `option_b` (TEXT)
- `option_c` (TEXT)
- `option_d` (TEXT)
- `correct_option` (TEXT)

## How to Use

1. Open the application in your browser
2. Click "Start Quiz" to begin
3. Answer questions using the provided options
4. Navigate between questions using Next/Previous buttons
5. Submit your answers on the final question
6. View your score and detailed results

## Features in Detail

### Timer
- Configurable quiz timer (default: 10 minutes)
- Visual countdown display
- Auto-submit when time expires

### Navigation
- Question counter (e.g., "Question 1 of 10")
- Previous button (disabled on first question)
- Next button (changes to Submit on last question)

### Results
- Overall score percentage
- Total correct/incorrect count
- Question-by-question breakdown
- Correct answer reveals for missed questions

## Deployment

This application is configured for deployment on **Vercel**. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

The application includes:
- Vercel serverless functions in the `api/` directory
- Automatic React build configuration
- CORS handling for API endpoints