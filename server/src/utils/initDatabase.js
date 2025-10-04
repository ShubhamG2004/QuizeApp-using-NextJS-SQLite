const database = require('../models/database');

console.log('Initializing database...');



setTimeout(() => {
  console.log('Database initialization complete');
  process.exit(0);
}, 2000);