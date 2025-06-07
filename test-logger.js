const axios = require('axios');

// Test the logging system by triggering validation errors and exceptions
async function testLogger() {
  const baseUrl = 'http://localhost:3000'; // Adjust if your server runs on a different port

  try {
    console.log('Testing validation error in correctorText...');
    // Missing required 'text' parameter to trigger validation error
    await axios.post(`${baseUrl}/api/tools/corrector-text`, {});
  } catch (error) {
    console.log('Expected validation error:', error.response?.status, error.response?.data?.message);
  }

  try {
    console.log('\nTesting validation error in translate...');
    // Missing required parameters to trigger validation error
    await axios.post(`${baseUrl}/api/tools/translate`, {});
  } catch (error) {
    console.log('Expected validation error:', error.response?.status, error.response?.data?.message);
  }

  console.log('\nCheck the logs directory for log files:');
  console.log('- logs/ToolController/errors.log');
}

testLogger();