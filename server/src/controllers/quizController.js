const database = require('../models/database');

class QuizController {
  // Get all questions without correct answers
  getQuestions(req, res) {
    database.getAllQuestions((err, questions) => {
      if (err) {
        console.error('Error fetching questions:', err.message);
        return res.status(500).json({ error: 'Failed to fetch questions' });
      }

      res.json({
        success: true,
        questions: questions,
        total: questions.length
      });
    });
  }

  // Submit quiz answers and calculate score
  submitQuiz(req, res) {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ 
        error: 'Invalid request format. Expected answers array.' 
      });
    }

    // Get all questions with correct answers
    database.getAllQuestionsWithAnswers((err, questions) => {
      if (err) {
        console.error('Error fetching questions for scoring:', err.message);
        return res.status(500).json({ error: 'Failed to process quiz submission' });
      }

      const results = this.calculateScore(answers, questions);
      
      res.json({
        success: true,
        ...results
      });
    });
  }

  // Calculate score and provide detailed results
  calculateScore(userAnswers, questions) {
    let correctCount = 0;
    const detailedResults = [];

    questions.forEach((question, index) => {
      const userAnswer = userAnswers.find(answer => answer.questionId === question.id);
      const selectedOption = userAnswer ? userAnswer.selectedOption : null;
      const isCorrect = selectedOption === question.correct_option;

      if (isCorrect) {
        correctCount++;
      }

      detailedResults.push({
        questionId: question.id,
        questionText: question.question_text,
        options: {
          A: question.option_a,
          B: question.option_b,
          C: question.option_c,
          D: question.option_d
        },
        correctOption: question.correct_option,
        selectedOption: selectedOption,
        isCorrect: isCorrect
      });
    });

    const totalQuestions = questions.length;
    const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    return {
      score: score,
      correctCount: correctCount,
      totalQuestions: totalQuestions,
      incorrectCount: totalQuestions - correctCount,
      detailedResults: detailedResults,
      passed: score >= 60 // Consider 60% as passing grade
    };
  }
}

module.exports = new QuizController();