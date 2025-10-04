const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', '..', 'database.db');

class Database {
  constructor() {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
      } else {
        console.log('Connected to SQLite database');
        this.initializeTables();
      }
    });
  }

  initializeTables() {
    const createQuestionsTable = `
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_text TEXT NOT NULL,
        option_a TEXT NOT NULL,
        option_b TEXT NOT NULL,
        option_c TEXT NOT NULL,
        option_d TEXT NOT NULL,
        correct_option TEXT NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D'))
      )
    `;

    this.db.run(createQuestionsTable, (err) => {
      if (err) {
        console.error('Error creating questions table:', err.message);
      } else {
        console.log('Questions table ready');
        this.seedQuestions();
      }
    });
  }

  seedQuestions() {
    // Always clear and reseed with programming questions
    this.db.run('DELETE FROM questions', (err) => {
      if (err) {
        console.error('Error clearing questions:', err.message);
        return;
      }
      console.log('Cleared existing questions, inserting programming questions...');
      this.insertSampleQuestions();
    });
  }

  insertSampleQuestions() {
    const sampleQuestions = [
      {
        question_text: "Which programming language is known as the 'language of the web'?",
        option_a: "Python",
        option_b: "JavaScript",
        option_c: "Java",
        option_d: "C++",
        correct_option: "B"
      },
      {
        question_text: "What does 'HTTP' stand for?",
        option_a: "HyperText Transfer Protocol",
        option_b: "High Tech Transfer Process",
        option_c: "Home Tool Transfer Protocol",
        option_d: "Hyperlink Text Transfer Process",
        correct_option: "A"
      },
      {
        question_text: "Which of the following is NOT a JavaScript data type?",
        option_a: "String",
        option_b: "Boolean",
        option_c: "Float",
        option_d: "Undefined",
        correct_option: "C"
      },
      {
        question_text: "What does 'SQL' stand for?",
        option_a: "Structured Query Language",
        option_b: "Simple Query Language",
        option_c: "Standard Query Language",
        option_d: "Sequential Query Language",
        correct_option: "A"
      },
      {
        question_text: "Which of the following is a Python web framework?",
        option_a: "React",
        option_b: "Angular",
        option_c: "Django",
        option_d: "Vue.js",
        correct_option: "C"
      },
      {
        question_text: "What is the time complexity of binary search?",
        option_a: "O(n)",
        option_b: "O(log n)",
        option_c: "O(n²)",
        option_d: "O(1)",
        correct_option: "B"
      },
      {
        question_text: "Which HTML tag is used to create a hyperlink?",
        option_a: "<link>",
        option_b: "<href>",
        option_c: "<a>",
        option_d: "<url>",
        correct_option: "C"
      },
      {
        question_text: "What does 'API' stand for?",
        option_a: "Application Programming Interface",
        option_b: "Advanced Programming Interface",
        option_c: "Automated Programming Interface",
        option_d: "Application Process Interface",
        correct_option: "A"
      },
      {
        question_text: "Which CSS property is used to change the text color?",
        option_a: "text-color",
        option_b: "font-color",
        option_c: "color",
        option_d: "text-style",
        correct_option: "C"
      },
      {
        question_text: "What is the correct syntax to create a function in JavaScript?",
        option_a: "function = myFunction() {}",
        option_b: "function myFunction() {}",
        option_c: "create myFunction() {}",
        option_d: "def myFunction() {}",
        correct_option: "B"
      },
      {
        question_text: "Which of the following is a NoSQL database?",
        option_a: "MySQL",
        option_b: "PostgreSQL",
        option_c: "MongoDB",
        option_d: "SQLite",
        correct_option: "C"
      },
      {
        question_text: "What does 'DOM' stand for in web development?",
        option_a: "Document Object Model",
        option_b: "Data Object Management",
        option_c: "Dynamic Object Model",
        option_d: "Document Oriented Model",
        correct_option: "A"
      },
      {
        question_text: "Which Git command is used to create a new branch?",
        option_a: "git new branch",
        option_b: "git create branch",
        option_c: "git branch",
        option_d: "git checkout -b",
        correct_option: "D"
      },
      {
        question_text: "What is the purpose of the 'async' keyword in JavaScript?",
        option_a: "To make functions run faster",
        option_b: "To handle asynchronous operations",
        option_c: "To create loops",
        option_d: "To define variables",
        correct_option: "B"
      },
      {
        question_text: "Which HTTP status code indicates 'Not Found'?",
        option_a: "200",
        option_b: "404",
        option_c: "500",
        option_d: "302",
        correct_option: "B"
      },
      {
        question_text: "What is the main purpose of CSS?",
        option_a: "To add interactivity to web pages",
        option_b: "To structure web content",
        option_c: "To style and layout web pages",
        option_d: "To handle server requests",
        correct_option: "C"
      },
      {
        question_text: "Which of the following is NOT a programming paradigm?",
        option_a: "Object-Oriented",
        option_b: "Functional",
        option_c: "Procedural",
        option_d: "Computational",
        correct_option: "D"
      },
      {
        question_text: "What does 'JSON' stand for?",
        option_a: "JavaScript Object Notation",
        option_b: "Java Standard Object Notation",
        option_c: "JavaScript Oriented Network",
        option_d: "Java Serialized Object Network",
        correct_option: "A"
      },
      {
        question_text: "Which Python keyword is used for exception handling?",
        option_a: "catch",
        option_b: "except",
        option_c: "handle",
        option_d: "error",
        correct_option: "B"
      },
      {
        question_text: "What is the correct way to comment a single line in most programming languages?",
        option_a: "/* comment */",
        option_b: "// comment",
        option_c: "# comment",
        option_d: "<!-- comment -->",
        correct_option: "B"
      }
    ];

    const insertStmt = this.db.prepare(`
      INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    sampleQuestions.forEach((question) => {
      insertStmt.run([
        question.question_text,
        question.option_a,
        question.option_b,
        question.option_c,
        question.option_d,
        question.correct_option
      ]);
    });

    insertStmt.finalize((err) => {
      if (err) {
        console.error('Error inserting sample questions:', err.message);
      } else {
        console.log('Sample questions inserted successfully');
      }
    });
  }

  getAllQuestions(callback) {
    const query = `
      SELECT id, question_text, option_a, option_b, option_c, option_d
      FROM questions
      ORDER BY id
    `;
    
    this.db.all(query, [], callback);
  }

  getQuestionWithAnswer(id, callback) {
    const query = `
      SELECT id, question_text, option_a, option_b, option_c, option_d, correct_option
      FROM questions
      WHERE id = ?
    `;
    
    this.db.get(query, [id], callback);
  }

  getAllQuestionsWithAnswers(callback) {
    const query = `
      SELECT id, question_text, option_a, option_b, option_c, option_d, correct_option
      FROM questions
      ORDER BY id
    `;
    
    this.db.all(query, [], callback);
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed');
      }
    });
  }
}

module.exports = new Database();