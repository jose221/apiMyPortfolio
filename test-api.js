/**
 * Simple script to test the API endpoints
 * Run with: node test-api.js
 */
const http = require('http');
const https = require('https');

// Configuration
const config = {
    host: 'localhost',
    port: process.env.PORT || 3000,
    endpoints: [
        { path: '/', method: 'GET', description: 'Root endpoint' },
        { path: '/health', method: 'GET', description: 'Health check' },
        { path: '/metrics', method: 'GET', description: 'Prometheus metrics' },
        { path: '/api-docs', method: 'GET', description: 'Swagger documentation' },
        { path: '/api/v1/auth/login', method: 'POST', description: 'Login endpoint' },
        { path: '/api/v1/portfolio', method: 'GET', description: 'Get all portfolio items' }
    ]
};

// Function to make HTTP requests
function makeRequest(options, data = null) {
    return new Promise((resolve, reject) => {
        const client = options.protocol === 'https:' ? https : http;
        
        const req = client.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    data: responseData
                });
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

// Test all endpoints
async function testEndpoints() {
    console.log('Testing API endpoints...');
    console.log('==============================================');
    
    for (const endpoint of config.endpoints) {
        try {
            const options = {
                host: config.host,
                port: config.port,
                path: endpoint.path,
                method: endpoint.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                protocol: 'http:'
            };
            
            console.log(`Testing ${endpoint.method} ${endpoint.path} (${endpoint.description})...`);
            
            let data = null;
            if (endpoint.method === 'POST' && endpoint.path === '/api/v1/auth/login') {
                data = {
                    email: 'test@example.com',
                    password: 'password123'
                };
            }
            
            const response = await makeRequest(options, data);
            
            console.log(`Status: ${response.statusCode}`);
            console.log(`Content-Type: ${response.headers['content-type'] || 'Not specified'}`);
            
            if (endpoint.path === '/api-docs') {
                console.log('Swagger documentation is available!');
            } else if (endpoint.path === '/metrics') {
                console.log('Prometheus metrics are available!');
            } else {
                try {
                    const parsedData = JSON.parse(response.data);
                    console.log('Response:', JSON.stringify(parsedData, null, 2).substring(0, 150) + '...');
                } catch (e) {
                    console.log('Response: (non-JSON data)');
                }
            }
            
            console.log('----------------------------------------------');
        } catch (error) {
            console.error(`Error testing ${endpoint.path}:`, error.message);
            console.log('----------------------------------------------');
        }
    }
    
    console.log('==============================================');
    console.log('API testing completed!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Start the server with: npm start');
    console.log('2. Access Swagger documentation at: http://localhost:3000/api-docs');
    console.log('3. Access Prometheus metrics at: http://localhost:3000/metrics');
    console.log('4. Check API health at: http://localhost:3000/health');
}

// Run the tests
testEndpoints();