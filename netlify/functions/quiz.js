const { getQuestions, submitAnswer, getResults } = require('../../server/src/controllers/quizController');

// Netlify function handler
exports.handler = async (event, context) => {
  const { httpMethod, path, body } = event;
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // Parse the path to determine the route
    const route = path.replace('/.netlify/functions/quiz', '');
    
    if (httpMethod === 'GET' && route === '/questions') {
      const result = await getQuestions();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      };
    }
    
    if (httpMethod === 'POST' && route === '/submit') {
      const requestBody = JSON.parse(body);
      const result = await submitAnswer(requestBody);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      };
    }
    
    if (httpMethod === 'GET' && route === '/results') {
      const result = await getResults();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Route not found' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};