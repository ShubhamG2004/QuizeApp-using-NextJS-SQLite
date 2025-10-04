const express = require('express');
const quizController = require('../controllers/quizController');

const router = express.Router();

// GET /api/quiz/questions - Fetch all questions
router.get('/questions', (req, res) => {
  quizController.getQuestions(req, res);
});

// POST /api/quiz/submit - Submit answs and get score
router.post('/submit', (req, res) => {
  quizController.submitQuiz(req, res);
});

module.exports = router;