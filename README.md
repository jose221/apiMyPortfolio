# Portfolio API

A RESTful API for managing portfolio data, built with Node.js, Express, and MySQL.

## Features

- **Modern Architecture**: MVC pattern with modular structure
- **API Documentation**: Swagger UI for easy API exploration
- **Monitoring**: Prometheus metrics for performance monitoring
- **Security**: JWT authentication, rate limiting, and security headers
- **Database**: MySQL with Sequelize ORM
- **Validation**: Request validation with express-validator
- **Error Handling**: Centralized error handling

## Architecture

The application follows a clean, modular architecture:

```
src/
├── api/
│   └── v1/
│       ├── controllers/    # Request handlers
│       ├── middlewares/    # Express middlewares
│       ├── models/         # Sequelize models
│       ├── routes/         # API routes
│       ├── services/       # Business logic
│       ├── utils/          # Utility functions
│       └── validators/     # Request validators
├── config/                 # Configuration files
├── database/               # Database connection
├── app.js                  # Express application setup
└── server.js               # Application entry point
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd apiMyPortfolio
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   DB_CONNECTION=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=your_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   SECRET_TOKEN=your_jwt_secret
   EXPIRED_MS_TOKEN=86400000
   ```

## Running the Application

### Development Mode
```
npm run dev
```

### Production Mode
```
npm start
```

## API Documentation

Swagger documentation is available at `/api-docs` when the application is running.

You can explore and test all API endpoints through the Swagger UI interface.

## Monitoring

Prometheus metrics are available at `/metrics` when the application is running.

The following metrics are collected:
- Default Node.js metrics
- HTTP request count by method, route, and status
- HTTP request duration by method, route, and status

A health check endpoint is available at `/health`.

## Security Features

- **JWT Authentication**: Secure API endpoints with JSON Web Tokens
- **Rate Limiting**: Prevent abuse by limiting request rates
- **Security Headers**: Helmet middleware for setting security-related HTTP headers
- **Input Validation**: Validate all input data to prevent injection attacks
- **Error Handling**: Proper error handling to avoid leaking sensitive information

## API Endpoints

The API provides the following main endpoints:

- **Authentication**
  - POST `/api/v1/auth/login`: User login
  - POST `/api/v1/auth/register`: User registration
  - POST `/api/v1/auth/logout`: User logout
  - GET `/api/v1/auth/profile`: Get user profile

- **Users**
  - GET `/api/v1/users`: Get all users (admin only)
  - GET `/api/v1/users/:id`: Get user by ID
  - PUT `/api/v1/users/:id`: Update user
  - DELETE `/api/v1/users/:id`: Delete user (admin only)

- **Portfolio**
  - GET `/api/v1/portfolio`: Get all portfolio items
  - GET `/api/v1/portfolio/:id`: Get portfolio item by ID
  - POST `/api/v1/portfolio`: Create portfolio item (admin only)
  - PUT `/api/v1/portfolio/:id`: Update portfolio item (admin only)
  - DELETE `/api/v1/portfolio/:id`: Delete portfolio item (admin only)
  - GET `/api/v1/portfolio/category/:categoryId`: Get portfolio items by category

## Testing

A test script is provided to verify the API functionality:

```
node test-api.js
```

This script tests the main endpoints and verifies that Swagger documentation and Prometheus metrics are available.

## License

ISC