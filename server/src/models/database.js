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
    // Check if questions already exist
    this.db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
      if (err) {
        console.error('Error checking questions:', err.message);
        return;
      }

      if (row.count === 0) {
        console.log('Seeding initial questions...');
        this.insertSampleQuestions();
      } else {
        console.log(`Database already has ${row.count} questions`);
      }
    });
  }

  insertSampleQuestions() {
    const sampleQuestions = [
      {
        question_text: "What is the capital of France?",
        option_a: "London",
        option_b: "Berlin",
        option_c: "Paris",
        option_d: "Madrid",
        correct_option: "C"
      },
      {
        question_text: "Which programming language is known as the 'language of the web'?",
        option_a: "Python",
        option_b: "JavaScript",
        option_c: "Java",
        option_d: "C++",
        correct_option: "B"
      },
      {
        question_text: "What is 2 + 2?",
        option_a: "3",
        option_b: "4",
        option_c: "5",
        option_d: "6",
        correct_option: "B"
      },
      {
        question_text: "Which planet is known as the Red Planet?",
        option_a: "Venus",
        option_b: "Mars",
        option_c: "Jupiter",
        option_d: "Saturn",
        correct_option: "B"
      },
      {
        question_text: "What is the largest mammal in the world?",
        option_a: "African Elephant",
        option_b: "Giraffe",
        option_c: "Blue Whale",
        option_d: "Polar Bear",
        correct_option: "C"
      },
      {
        question_text: "In which year was the first iPhone released?",
        option_a: "2006",
        option_b: "2007",
        option_c: "2008",
        option_d: "2009",
        correct_option: "B"
      },
      {
        question_text: "What is the chemical symbol for gold?",
        option_a: "Go",
        option_b: "Gd",
        option_c: "Au",
        option_d: "Ag",
        correct_option: "C"
      },
      {
        question_text: "Which ocean is the largest?",
        option_a: "Atlantic",
        option_b: "Indian",
        option_c: "Arctic",
        option_d: "Pacific",
        correct_option: "D"
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
        question_text: "Which country has the most natural lakes?",
        option_a: "Russia",
        option_b: "Canada",
        option_c: "USA",
        option_d: "Finland",
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