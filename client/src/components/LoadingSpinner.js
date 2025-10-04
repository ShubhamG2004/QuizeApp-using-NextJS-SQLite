import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading fade-in">
      <div className="spinner"></div>
      <div className="loading-text">{message}</div>
    </div>
  );
};

export default LoadingSpinner;