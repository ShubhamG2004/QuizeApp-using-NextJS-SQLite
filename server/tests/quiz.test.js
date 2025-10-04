const request = require('supertest');
const app = require('../src/index');

describe('Quiz API Endpoints', () => {
  describe('GET /api/quiz/questions', () => {
    it('should fetch all questions without correct answers', async () => {
      const response = await request(app)
        .get('/api/quiz/questions')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('questions');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.questions)).toBe(true);
      
      // Check that questions don't include correct answers
      if (response.body.questions.length > 0) {
        const question = response.body.questions[0];
        expect(question).toHaveProperty('id');
        expect(question).toHaveProperty('question_text');
        expect(question).toHaveProperty('option_a');
        expect(question).toHaveProperty('option_b');
        expect(question).toHaveProperty('option_c');
        expect(question).toHaveProperty('option_d');
        expect(question).not.toHaveProperty('correct_option');
      }
    });
  });

  describe('POST /api/quiz/submit', () => {
    it('should calculate score correctly for all correct answers', async () => {
      // First get the questions to know the structure
      const questionsResponse = await request(app)
        .get('/api/quiz/questions');

      const questions = questionsResponse.body.questions;
      
      // Create answers array with all correct answers (for testing, we know the correct answers)
      const correctAnswers = [
        { questionId: 1, selectedOption: 'B' }, // JavaScript
        { questionId: 2, selectedOption: 'A' }, // HTTP
        { questionId: 3, selectedOption: 'C' }, // JavaScript data types
        { questionId: 4, selectedOption: 'A' }, // SQL
        { questionId: 5, selectedOption: 'C' }, // Django
      ];

      const response = await request(app)
        .post('/api/quiz/submit')
        .send({ answers: correctAnswers })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('score');
      expect(response.body).toHaveProperty('correctCount');
      expect(response.body).toHaveProperty('totalQuestions');
      expect(response.body).toHaveProperty('incorrectCount');
      expect(response.body).toHaveProperty('detailedResults');
      expect(response.body).toHaveProperty('passed');

      expect(Array.isArray(response.body.detailedResults)).toBe(true);
    });

    it('should calculate score correctly for all wrong answers', async () => {
      const wrongAnswers = [
        { questionId: 1, selectedOption: 'A' }, // Wrong answer
        { questionId: 2, selectedOption: 'A' }, // Wrong answer
        { questionId: 3, selectedOption: 'A' }, // Wrong answer
      ];

      const response = await request(app)
        .post('/api/quiz/submit')
        .send({ answers: wrongAnswers })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.score).toBe(0);
      expect(response.body.correctCount).toBe(0);
      expect(response.body.passed).toBe(false);
    });

    it('should handle mixed correct and incorrect answers', async () => {
      const mixedAnswers = [
        { questionId: 1, selectedOption: 'B' }, // Correct - JavaScript
        { questionId: 2, selectedOption: 'B' }, // Wrong - Should be HyperText Transfer Protocol
        { questionId: 3, selectedOption: 'C' }, // Correct - Float is not a JS data type
      ];

      const response = await request(app)
        .post('/api/quiz/submit')
        .send({ answers: mixedAnswers })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.correctCount).toBe(2);
      
      // Check detailed results
      const detailedResults = response.body.detailedResults;
      expect(detailedResults[0].isCorrect).toBe(true);
      expect(detailedResults[1].isCorrect).toBe(false);
      expect(detailedResults[2].isCorrect).toBe(true);
    });

    it('should handle empty answers array', async () => {
      const response = await request(app)
        .post('/api/quiz/submit')
        .send({ answers: [] })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.score).toBe(0);
      expect(response.body.correctCount).toBe(0);
    });

    it('should handle missing answers for some questions', async () => {
      const partialAnswers = [
        { questionId: 1, selectedOption: 'B' }, // Only answer first question - JavaScript (correct)
      ];

      const response = await request(app)
        .post('/api/quiz/submit')
        .send({ answers: partialAnswers })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.correctCount).toBe(1);
      
      // Check that unanswered questions are marked as incorrect
      const detailedResults = response.body.detailedResults;
      const answeredQuestion = detailedResults.find(r => r.questionId === 1);
      expect(answeredQuestion.isCorrect).toBe(true);
      
      const unansweredQuestion = detailedResults.find(r => r.questionId === 2);
      expect(unansweredQuestion.isCorrect).toBe(false);
      expect(unansweredQuestion.selectedOption).toBe(null);
    });

    it('should return 400 for invalid request format', async () => {
      const response = await request(app)
        .post('/api/quiz/submit')
        .send({ invalid: 'data' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for non-array answers', async () => {
      const response = await request(app)
        .post('/api/quiz/submit')
        .send({ answers: 'not an array' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/health', () => {
    it('should return health check information', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('404 handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
});