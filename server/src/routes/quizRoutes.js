const express = require('express');
const quizController = require('../controllers/quizController');

const router = express.Router();

// GET /api/quiz/questions - Fetch all questions (without correct answers)
router.get('/questions', (req, res) => {
  quizController.getQuestions(req, res);
});

// POST /api/quiz/submit - Submit quiz answers and get score
router.post('/submit', (req, res) => {
  quizController.submitQuiz(req, res);
});

module.exports = router;