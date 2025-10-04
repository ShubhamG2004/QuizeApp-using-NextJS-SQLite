import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Ensure your CSS file includes .btn-primary-enhanced for proper styling

const StartPage = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: "🧠",
      title: "Comprehensive Coverage",
      description: "Test your knowledge across multiple programming domains"
    },
    {
      icon: "⏱️",
      title: "Time Management",
      description: "15 minutes to showcase your programming expertise"
    },
    {
      icon: "📊",
      title: "Detailed Analytics",
      description: "Get comprehensive feedback and performance insights"
    },
    {
      icon: "🎯",
      title: "Skill Assessment",
      description: "Identify your strengths and areas for improvement"
    }
  ];

  const technologies = [
    { name: "JavaScript", color: "#f7df1e", icon: "🟨" },
    { name: "Python", color: "#3776ab", icon: "🐍" },
    { name: "React", color: "#61dafb", icon: "⚛️" },
    { name: "Node.js", color: "#339933", icon: "🟢" },
    { name: "SQL", color: "#336791", icon: "🗄️" },
    { name: "Git", color: "#f05032", icon: "📝" }
  ];

  const quizStats = [
    { label: "Questions", value: "20", icon: "❓" },
    { label: "Time Limit", value: "15 min", icon: "⏰" },
    { label: "Difficulty", value: "Mixed", icon: "📈" },
    { label: "Topics", value: "6+", icon: "📚" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="enhanced-start-page">
      {/* Hero Section */}
      <div className={`hero-section ${isVisible ? 'visible' : ''}`}>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">💻 Programming Assessment</span>
          </div>
          
          <h1 className="hero-title">
            Master Your <span className="gradient-text">Programming Skills</span>
          </h1>
          
          <p className="hero-description">
            Challenge yourself with our comprehensive programming quiz designed to test 
            your knowledge across multiple technologies and programming paradigms. 
            Perfect for developers at all levels.
          </p>

          {/* Hero CTA Button */}
          <div className="hero-cta">
            <Link to="/quiz" className="btn-primary-enhanced hero-btn">
              <span className="btn-icon">🚀</span>
              <span className="btn-text">Start Quiz Now</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>

          {/* Dynamic Features Showcase */}
          <div className="features-showcase">
            <div className="feature-card active">
              <div className="feature-icon">{features[currentFeature].icon}</div>
              <div className="feature-content">
                <h3>{features[currentFeature].title}</h3>
                <p>{features[currentFeature].description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="floating-elements">
          {technologies.map((tech, index) => (
            <div 
              key={tech.name}
              className="floating-tech"
              style={{ 
                '--delay': `${index * 0.5}s`,
                '--color': tech.color
              }}
            >
              <span className="tech-icon">{tech.icon}</span>
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Stats Section */}
      <div className="quiz-stats-section">
        <h2 className="section-title">Quiz Overview</h2>
        <div className="stats-grid">
          {quizStats.map((stat, index) => (
            <div key={stat.label} className="stat-card" style={{ '--delay': `${index * 0.1}s` }}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <h2 className="section-title">What You'll Be Tested On</h2>
        <div className="topics-grid">
          {[
            { 
              title: "Core Programming", 
              topics: ["Variables & Data Types", "Control Structures", "Functions & Scope"],
              icon: "🔧",
              color: "var(--primary)"
            },
            { 
              title: "Web Development", 
              topics: ["HTML/CSS", "DOM Manipulation", "API Integration"],
              icon: "🌐",
              color: "var(--secondary)"
            },
            { 
              title: "Database & Backend", 
              topics: ["SQL Queries", "Database Design", "Server Architecture"],
              icon: "💾",
              color: "var(--success)"
            },
            { 
              title: "Version Control", 
              topics: ["Git Commands", "Branching", "Collaboration"],
              icon: "📋",
              color: "var(--warning)"
            }
          ].map((category, index) => (
            <div key={category.title} className="topic-card" style={{ '--delay': `${index * 0.15}s` }}>
              <div className="topic-header">
                <div className="topic-icon" style={{ backgroundColor: category.color }}>
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
              </div>
              <ul className="topic-list">
                {category.topics.map((topic, i) => (
                  <li key={i}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Test Your Skills?</h2>
          <p>Join thousands of developers who have challenged themselves with our programming quiz.</p>
          
          <div className="cta-buttons">
            <Link to="/quiz" className="btn-primary-enhanced">
              <span className="btn-icon">🚀</span>
              <span className="btn-text">Start Quiz Now</span>
              <span className="btn-arrow">→</span>
            </Link>
            
            <button className="btn-secondary-enhanced" onClick={() => {
              document.querySelector('.topics-section').scrollIntoView({ behavior: 'smooth' });
            }}>
              <span className="btn-icon">�</span>
              <span className="btn-text">Learn More</span>
            </button>
          </div>

          {/* Quick Tips */}
          <div className="quick-tips">
            <h4>💡 Pro Tips for Success:</h4>
            <div className="tips-list">
              <span className="tip">Read questions carefully</span>
              <span className="tip">Manage your time wisely</span>
              <span className="tip">Review before submitting</span>
              <span className="tip">Stay calm and focused</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="progress-indicators">
        {features.map((_, index) => (
          <div 
            key={index}
            className={`progress-dot ${index === currentFeature ? 'active' : ''}`}
            onClick={() => setCurrentFeature(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default StartPage;