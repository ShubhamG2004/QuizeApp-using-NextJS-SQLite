# Online Quiz Application

A full-stack quiz application built with React (frontend) and Node.js/Express (backend) with SQLite database.

## Features

### Core Features
- ✅ Start page to begin the quiz
- ✅ Question navigation with Next/Previous buttons
- ✅ Submit quiz and get score
- ✅ Results page showing final score

### Bonus Features
- ✅ Timer functionality
- ✅ Detailed results showing correct/incorrect answers
- ✅ Backend tests for scoring logic

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

1. **Install dependencies:**
   ```bash
   npm run install-deps
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend server on http://localhost:3000

3. **Run tests:**
   ```bash
   npm test
   ```

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