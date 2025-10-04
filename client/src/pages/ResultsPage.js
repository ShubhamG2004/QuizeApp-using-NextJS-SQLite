import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();
  const { results, totalQuestions, answeredQuestions } = location.state || {};

  // If no results data, redirect to start
  if (!results) {
    return (
      <div className="container">
        <div className="error card text-center">
          <h3>No Results Available</h3>
          <p>No quiz results found. Please take the quiz first.</p>
          <Link to="/" className="btn btn-primary">
            Start Quiz
          </Link>
        </div>
      </div>
    );
  }

  const getScoreClass = (score) => {
    if (score >= 90) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'average';
    return 'poor';
  };

  const getScoreMessage = (score, passed) => {
    if (score >= 90) return '🎉 Excellent work! Outstanding performance!';
    if (score >= 70) return '👏 Great job! Well done!';
    if (score >= 50) return '👍 Good effort! Keep practicing!';
    if (passed) return '✅ You passed! Good work!';
    return '📚 Keep studying and try again!';
  };

  const getResultIcon = (isCorrect) => {
    return isCorrect ? '✅' : '❌';
  };

  return (
    <div className="results-page container">
      <div className="score-summary card fade-in">
        <h2>Quiz Results 📊</h2>
        
        <div className={`score-display ${getScoreClass(results.score)}`}>
          {results.score}%
        </div>
        
        <div className="score-message">
          {getScoreMessage(results.score, results.passed)}
        </div>
        
        <div className="score-details">
          <div className="score-stat">
            <span className="score-stat-value correct">{results.correctCount}</span>
            <div className="score-stat-label">Correct</div>
          </div>
          <div className="score-stat">
            <span className="score-stat-value incorrect">{results.incorrectCount}</span>
            <div className="score-stat-label">Incorrect</div>
          </div>
          <div className="score-stat">
            <span className="score-stat-value">{results.totalQuestions}</span>
            <div className="score-stat-label">Total Questions</div>
          </div>
          <div className="score-stat">
            <span className="score-stat-value">{answeredQuestions}</span>
            <div className="score-stat-label">Answered</div>
          </div>
        </div>
        
        <div className="text-center" style={{ marginTop: '30px' }}>
          <Link to="/" className="btn btn-primary">
            🔄 Take Quiz Again
          </Link>
        </div>
      </div>

      <div className="detailed-results">
        <h3>📝 Detailed Results</h3>
        
        {results.detailedResults.map((result, index) => (
          <div 
            key={result.questionId} 
            className={`result-item card ${result.isCorrect ? 'correct' : 'incorrect'} fade-in`}
            style={{ '--i': index }}
          >
            <div className="result-question">
              <strong>Question {index + 1}:</strong> {result.questionText}
            </div>
            
            <div className="result-options">
              {Object.entries(result.options).map(([key, text]) => {
                let optionClass = 'result-option';
                
                // Mark correct answer
                if (key === result.correctOption) {
                  optionClass += ' correct-answer';
                }
                
                // Mark selected answer (if different from correct)
                if (key === result.selectedOption && key !== result.correctOption) {
                  optionClass += ' selected';
                }
                
                // If selected answer is also correct
                if (key === result.selectedOption && key === result.correctOption) {
                  optionClass += ' selected correct-answer';
                }
                
                return (
                  <div key={key} className={optionClass}>
                    <strong>{key}.</strong> {text}
                    {key === result.correctOption && ' ✓'}
                    {key === result.selectedOption && key !== result.correctOption && ' (Your answer)'}
                  </div>
                );
              })}
            </div>
            
            <div className={`result-status ${result.isCorrect ? 'correct' : 'incorrect'}`}>
              <span className="status-icon">{getResultIcon(result.isCorrect)}</span>
              <span>
                {result.isCorrect 
                  ? 'Correct!' 
                  : result.selectedOption 
                    ? `Incorrect. You selected ${result.selectedOption}, but the correct answer is ${result.correctOption}.`
                    : `Not answered. The correct answer is ${result.correctOption}.`
                }
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center" style={{ marginTop: '40px', marginBottom: '40px' }}>
        <Link to="/" className="btn btn-primary btn-lg glow">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ResultsPage;