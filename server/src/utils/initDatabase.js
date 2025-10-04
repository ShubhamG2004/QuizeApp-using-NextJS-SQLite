const database = require('../models/database');

// This script initializes the database with sample questions
// Run with: node src/utils/initDatabase.js

console.log('Initializing database...');

// Database initialization happens automatically when the database module is imported
// This script is here if manual initialization is needed

setTimeout(() => {
  console.log('Database initialization complete');
  process.exit(0);
}, 2000);