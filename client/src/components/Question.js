import React from 'react';

const Question = ({ question, selectedAnswer, onAnswerChange, questionNumber, totalQuestions }) => {
  const handleOptionChange = (option) => {
    onAnswerChange(question.id, option);
  };

  return (
    <div className="question-card card fade-in">
      <div className="question-header">
        <div className="question-counter">
          Question {questionNumber} of {totalQuestions}
        </div>
      </div>
      
      <h3 className="question-text">{question.question_text}</h3>
      
      <div className="options-container">
        {[
          { key: 'A', text: question.option_a },
          { key: 'B', text: question.option_b },
          { key: 'C', text: question.option_c },
          { key: 'D', text: question.option_d }
        ].map((option, index) => (
          <div
            key={option.key}
            className={`option ${selectedAnswer === option.key ? 'selected' : ''}`}
            onClick={() => handleOptionChange(option.key)}
            style={{ '--i': index }}
          >
            <input
              type="radio"
              id={`question-${question.id}-option-${option.key}`}
              name={`question-${question.id}`}
              value={option.key}
              checked={selectedAnswer === option.key}
              onChange={() => handleOptionChange(option.key)}
            />
            <label 
              htmlFor={`question-${question.id}-option-${option.key}`}
              className="option-label"
            >
              <strong>{option.key}.</strong> {option.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;