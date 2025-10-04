const quizController = require('../src/controllers/quizController');

describe('QuizController - calculateScore method', () => {
  const sampleQuestions = [
    {
      id: 1,
      question_text: "What is 2 + 2?",
      option_a: "3",
      option_b: "4",
      option_c: "5",
      option_d: "6",
      correct_option: "B"
    },
    {
      id: 2,
      question_text: "What is the capital of France?",
      option_a: "London",
      option_b: "Berlin",
      option_c: "Paris",
      option_d: "Madrid",
      correct_option: "C"
    },
    {
      id: 3,
      question_text: "Which planet is red?",
      option_a: "Venus",
      option_b: "Mars",
      option_c: "Jupiter",
      option_d: "Saturn",
      correct_option: "B"
    }
  ];

  it('should calculate 100% score for all correct answers', () => {
    const userAnswers = [
      { questionId: 1, selectedOption: 'B' },
      { questionId: 2, selectedOption: 'C' },
      { questionId: 3, selectedOption: 'B' }
    ];

    const result = quizController.calculateScore(userAnswers, sampleQuestions);

    expect(result.score).toBe(100);
    expect(result.correctCount).toBe(3);
    expect(result.totalQuestions).toBe(3);
    expect(result.incorrectCount).toBe(0);
    expect(result.passed).toBe(true);
    expect(result.detailedResults).toHaveLength(3);
    
    result.detailedResults.forEach(detail => {
      expect(detail.isCorrect).toBe(true);
    });
  });

  it('should calculate 0% score for all incorrect answers', () => {
    const userAnswers = [
      { questionId: 1, selectedOption: 'A' },
      { questionId: 2, selectedOption: 'A' },
      { questionId: 3, selectedOption: 'A' }
    ];

    const result = quizController.calculateScore(userAnswers, sampleQuestions);

    expect(result.score).toBe(0);
    expect(result.correctCount).toBe(0);
    expect(result.totalQuestions).toBe(3);
    expect(result.incorrectCount).toBe(3);
    expect(result.passed).toBe(false);
    
    result.detailedResults.forEach(detail => {
      expect(detail.isCorrect).toBe(false);
    });
  });

  it('should calculate partial score correctly', () => {
    const userAnswers = [
      { questionId: 1, selectedOption: 'B' }, // Correct
      { questionId: 2, selectedOption: 'A' }, // Incorrect
      { questionId: 3, selectedOption: 'B' }  // Correct
    ];

    const result = quizController.calculateScore(userAnswers, sampleQuestions);

    expect(result.score).toBe(67); // 2/3 = 66.67% rounded to 67%
    expect(result.correctCount).toBe(2);
    expect(result.totalQuestions).toBe(3);
    expect(result.incorrectCount).toBe(1);
    expect(result.passed).toBe(true); // Above 60%
    
    expect(result.detailedResults[0].isCorrect).toBe(true);
    expect(result.detailedResults[1].isCorrect).toBe(false);
    expect(result.detailedResults[2].isCorrect).toBe(true);
  });

  it('should handle missing answers (unanswered questions)', () => {
    const userAnswers = [
      { questionId: 1, selectedOption: 'B' }, // Correct
      // Missing answer for question 2
      { questionId: 3, selectedOption: 'A' }  // Incorrect
    ];

    const result = quizController.calculateScore(userAnswers, sampleQuestions);

    expect(result.score).toBe(33); // 1/3 = 33.33% rounded to 33%
    expect(result.correctCount).toBe(1);
    expect(result.totalQuestions).toBe(3);
    expect(result.incorrectCount).toBe(2);
    expect(result.passed).toBe(false);
    
    expect(result.detailedResults[0].isCorrect).toBe(true);
    expect(result.detailedResults[0].selectedOption).toBe('B');
    
    expect(result.detailedResults[1].isCorrect).toBe(false);
    expect(result.detailedResults[1].selectedOption).toBe(null);
    
    expect(result.detailedResults[2].isCorrect).toBe(false);
    expect(result.detailedResults[2].selectedOption).toBe('A');
  });

  it('should handle empty answers array', () => {
    const userAnswers = [];

    const result = quizController.calculateScore(userAnswers, sampleQuestions);

    expect(result.score).toBe(0);
    expect(result.correctCount).toBe(0);
    expect(result.totalQuestions).toBe(3);
    expect(result.incorrectCount).toBe(3);
    expect(result.passed).toBe(false);
    
    result.detailedResults.forEach(detail => {
      expect(detail.isCorrect).toBe(false);
      expect(detail.selectedOption).toBe(null);
    });
  });

  it('should include all required fields in detailed results', () => {
    const userAnswers = [
      { questionId: 1, selectedOption: 'B' }
    ];

    const result = quizController.calculateScore(userAnswers, sampleQuestions);

    result.detailedResults.forEach(detail => {
      expect(detail).toHaveProperty('questionId');
      expect(detail).toHaveProperty('questionText');
      expect(detail).toHaveProperty('options');
      expect(detail).toHaveProperty('correctOption');
      expect(detail).toHaveProperty('selectedOption');
      expect(detail).toHaveProperty('isCorrect');
      
      expect(detail.options).toHaveProperty('A');
      expect(detail.options).toHaveProperty('B');
      expect(detail.options).toHaveProperty('C');
      expect(detail.options).toHaveProperty('D');
    });
  });

  it('should handle edge case with no questions', () => {
    const userAnswers = [];
    const noQuestions = [];

    const result = quizController.calculateScore(userAnswers, noQuestions);

    expect(result.score).toBe(0);
    expect(result.correctCount).toBe(0);
    expect(result.totalQuestions).toBe(0);
    expect(result.incorrectCount).toBe(0);
    expect(result.passed).toBe(false);
    expect(result.detailedResults).toHaveLength(0);
  });

  it('should determine passing grade correctly (60% threshold)', () => {
    // Test exactly 60% - should pass
    const passingAnswers = [
      { questionId: 1, selectedOption: 'B' }, // Correct
      { questionId: 2, selectedOption: 'C' }, // Correct
      { questionId: 3, selectedOption: 'A' }  // Incorrect
    ];

    const passingResult = quizController.calculateScore(passingAnswers, sampleQuestions);
    expect(passingResult.score).toBe(67); // 2/3 = 67%
    expect(passingResult.passed).toBe(true);

    // Test below 60% - should fail
    const failingAnswers = [
      { questionId: 1, selectedOption: 'B' }, // Correct
      { questionId: 2, selectedOption: 'A' }, // Incorrect
      { questionId: 3, selectedOption: 'A' }  // Incorrect
    ];

    const failingResult = quizController.calculateScore(failingAnswers, sampleQuestions);
    expect(failingResult.score).toBe(33); // 1/3 = 33%
    expect(failingResult.passed).toBe(false);
  });
});