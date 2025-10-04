// Sample questions data - embedded for serverless environment
const sampleQuestions = [
  {
    id: 1,
    question_text: "Which programming language is known as the 'language of the web'?",
    option_a: "Python",
    option_b: "JavaScript",
    option_c: "Java",
    option_d: "C++",
    correct_option: "B"
  },
  {
    id: 2,
    question_text: "What does 'HTTP' stand for?",
    option_a: "HyperText Transfer Protocol",
    option_b: "High Tech Transfer Process",
    option_c: "Home Tool Transfer Protocol",
    option_d: "Hyperlink Text Transfer Process",
    correct_option: "A"
  },
  {
    id: 3,
    question_text: "Which of the following is NOT a JavaScript data type?",
    option_a: "String",
    option_b: "Boolean",
    option_c: "Float",
    option_d: "Undefined",
    correct_option: "C"
  },
  {
    id: 4,
    question_text: "What does 'SQL' stand for?",
    option_a: "Structured Query Language",
    option_b: "Simple Query Language",
    option_c: "Standard Query Language",
    option_d: "Sequential Query Language",
    correct_option: "A"
  },
  {
    id: 5,
    question_text: "Which of the following is a Python web framework?",
    option_a: "React",
    option_b: "Angular",
    option_c: "Django",
    option_d: "Vue.js",
    correct_option: "C"
  },
  {
    id: 6,
    question_text: "What is the time complexity of binary search?",
    option_a: "O(n)",
    option_b: "O(log n)",
    option_c: "O(n²)",
    option_d: "O(1)",
    correct_option: "B"
  },
  {
    id: 7,
    question_text: "Which HTML tag is used to create a hyperlink?",
    option_a: "<link>",
    option_b: "<href>",
    option_c: "<a>",
    option_d: "<url>",
    correct_option: "C"
  },
  {
    id: 8,
    question_text: "What does 'API' stand for?",
    option_a: "Application Programming Interface",
    option_b: "Advanced Programming Interface",
    option_c: "Automated Programming Interface",
    option_d: "Application Process Interface",
    correct_option: "A"
  },
  {
    id: 9,
    question_text: "Which CSS property is used to change the text color?",
    option_a: "text-color",
    option_b: "font-color",
    option_c: "color",
    option_d: "text-style",
    correct_option: "C"
  },
  {
    id: 10,
    question_text: "What is the correct syntax to create a function in JavaScript?",
    option_a: "function = myFunction() {}",
    option_b: "function myFunction() {}",
    option_c: "create myFunction() {}",
    option_d: "def myFunction() {}",
    correct_option: "B"
  },
  {
    id: 11,
    question_text: "Which of the following is a NoSQL database?",
    option_a: "MySQL",
    option_b: "PostgreSQL",
    option_c: "MongoDB",
    option_d: "SQLite",
    correct_option: "C"
  },
  {
    id: 12,
    question_text: "What does 'DOM' stand for in web development?",
    option_a: "Document Object Model",
    option_b: "Data Object Management",
    option_c: "Dynamic Object Model",
    option_d: "Document Oriented Model",
    correct_option: "A"
  },
  {
    id: 13,
    question_text: "Which Git command is used to create a new branch?",
    option_a: "git new branch",
    option_b: "git create branch",
    option_c: "git branch",
    option_d: "git checkout -b",
    correct_option: "D"
  },
  {
    id: 14,
    question_text: "What is the purpose of the 'async' keyword in JavaScript?",
    option_a: "To make functions run faster",
    option_b: "To handle asynchronous operations",
    option_c: "To create loops",
    option_d: "To define variables",
    correct_option: "B"
  },
  {
    id: 15,
    question_text: "Which HTTP status code indicates 'Not Found'?",
    option_a: "200",
    option_b: "404",
    option_c: "500",
    option_d: "302",
    correct_option: "B"
  },
  {
    id: 16,
    question_text: "What is the main purpose of CSS?",
    option_a: "To add interactivity to web pages",
    option_b: "To structure web content",
    option_c: "To style and layout web pages",
    option_d: "To handle server requests",
    correct_option: "C"
  },
  {
    id: 17,
    question_text: "Which of the following is NOT a programming paradigm?",
    option_a: "Object-Oriented",
    option_b: "Functional",
    option_c: "Procedural",
    option_d: "Computational",
    correct_option: "D"
  },
  {
    id: 18,
    question_text: "What does 'JSON' stand for?",
    option_a: "JavaScript Object Notation",
    option_b: "Java Standard Object Notation",
    option_c: "JavaScript Oriented Network",
    option_d: "Java Serialized Object Network",
    correct_option: "A"
  },
  {
    id: 19,
    question_text: "Which Python keyword is used for exception handling?",
    option_a: "catch",
    option_b: "except",
    option_c: "handle",
    option_d: "error",
    correct_option: "B"
  },
  {
    id: 20,
    question_text: "What is the correct way to comment a single line in most programming languages?",
    option_a: "/* comment */",
    option_b: "// comment",
    option_c: "# comment",
    option_d: "<!-- comment -->",
    correct_option: "B"
  }
];

// Get all questions without correct answers
const getQuestions = () => {
  const questions = sampleQuestions.map(question => ({
    id: question.id,
    questionText: question.question_text,
    options: {
      A: question.option_a,
      B: question.option_b,
      C: question.option_c,
      D: question.option_d
    }
  }));

  return {
    success: true,
    questions: questions,
    total: questions.length
  };
};

// Submit quiz and calculate results
const submitQuiz = (answers) => {
  const results = calculateScore(answers, sampleQuestions);
  return {
    success: true,
    ...results
  };
};

// Calculate score and provide detailed results
const calculateScore = (userAnswers, questions) => {
  let correctCount = 0;
  const detailedResults = [];
  const totalQuestions = questions.length;

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

  const incorrectCount = totalQuestions - correctCount;
  const score = Math.round((correctCount / totalQuestions) * 100);
  const passed = score >= 60; // 60% passing grade

  return {
    score: score,
    correctCount: correctCount,
    incorrectCount: incorrectCount,
    totalQuestions: totalQuestions,
    passed: passed,
    detailedResults: detailedResults
  };
};

// Vercel serverless function handler
export default async function handler(req, res) {
  const { method, url } = req;
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  // Handle preflight requests
  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Parse the URL to determine the route
    const urlPath = new URL(url, `http://${req.headers.host}`).pathname;
    const route = urlPath.replace('/api/quiz', '');
    
    if (method === 'GET' && route === '/questions') {
      const result = getQuestions();
      return res.status(200).json(result);
    }
    
    if (method === 'POST' && route === '/submit') {
      const result = submitQuiz(req.body.answers);
      return res.status(200).json(result);
    }
    
    // Health check endpoint
    if (method === 'GET' && (route === '/health' || route === '')) {
      return res.status(200).json({ 
        success: true, 
        message: 'Quiz API is running',
        timestamp: new Date().toISOString()
      });
    }

    return res.status(404).json({ error: 'Route not found' });
  } catch (error) {
    console.error('Function error:', error);
    return res.status(500).json({ error: error.message });
  }
}