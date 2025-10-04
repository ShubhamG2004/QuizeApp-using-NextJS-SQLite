import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from '../components/Question';
import Timer from '../components/Timer';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchQuestions, submitQuiz } from '../services/api';

const QuizPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  
  const QUIZ_DURATION = 15 * 60; 

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetchQuestions();
      setQuestions(response.questions);
      setTimerActive(true);
    } catch (err) {
      console.error('Error loading questions:', err);
      setError('Failed to load quiz questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    if (window.confirm('Are you sure you want to submit your quiz? You cannot change your answers after submission.')) {
      await submitQuizAnswers();
    }
  };

  const handleTimeUp = async () => {
    alert('Time is up! Your quiz will be submitted automatically.');
    await submitQuizAnswers();
  };

  const submitQuizAnswers = async () => {
    try {
      setSubmitting(true);
      setTimerActive(false);
      
      // Format answers for API
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId: parseInt(questionId),
        selectedOption
      }));

      const results = await submitQuiz(formattedAnswers);
      
      // Navigate to results page with the results data
      navigate('/results', { 
        state: { 
          results,
          totalQuestions: questions.length,
          answeredQuestions: Object.keys(answers).length
        } 
      });
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError('Failed to submit quiz. Please try again.');
      setTimerActive(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading quiz questions..." />;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error card text-center">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button onClick={loadQuestions} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container">
        <div className="error card text-center">
          <h3>No Questions Available</h3>
          <p>There are no quiz questions available at the moment.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="quiz-page container">
      <div className="quiz-header">
        <div className="question-counter">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <Timer 
          duration={QUIZ_DURATION}
          onTimeUp={handleTimeUp}
          isActive={timerActive && !submitting}
        />
      </div>

      <Question
        question={currentQuestion}
        selectedAnswer={currentAnswer}
        onAnswerChange={handleAnswerChange}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />

      <div className="navigation card">
        <div className="question-progress">
          <div className="progress-text">
            Progress: {Object.keys(answers).length} of {questions.length} answered
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${(Object.keys(answers).length / questions.length) * 100}%`,
                height: '4px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
        
        <div className="nav-buttons">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="btn btn-secondary"
          >
            ← Previous
          </button>
          
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn btn-success"
            >
              {submitting ? 'Submitting...' : '✓ Submit Quiz'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn btn-primary"
            >
              Next →
            </button>
          )}
        </div>
      </div>

      {submitting && (
        <div className="card text-center">
          <LoadingSpinner message="Submitting your quiz..." />
        </div>
      )}
    </div>
  );
};

export default QuizPage;