const database = require('./src/models/database');

console.log('Reinitializing database with new programming questions...');

// Wait a moment for database to initialize, then force reseed
setTimeout(() => {
  database.db.run('DELETE FROM questions', (err) => {
    if (err) {
      console.error('Error clearing questions:', err.message);
      process.exit(1);
    }
    console.log('Cleared existing questions');
    
    // Trigger reseeding
    database.seedQuestions();
    
    setTimeout(() => {
      database.db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
        if (err) {
          console.error('Error checking questions:', err.message);
        } else {
          console.log(`Database now has ${row.count} programming questions`);
        }
        process.exit(0);
      });
    }, 2000);
  });
}, 1000);