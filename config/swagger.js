const swaggerJSDoc = require('swagger-jsdoc');

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación de tu API',
      version: '1.0.0',
      description: 'Descripción breve de tu API',
    },
    servers: [
      {
        url: `http://localhost:${port}/api/admin`,
      },
    ],
    components: {
      securitySchemes: {
        AuthToken: {
          type: 'apiKey',
          in: 'header',
          name: 'auth-token',
          description: 'Coloca tu token de autenticación aquí',
        },
      },
    },
    security: [
      { AuthToken: [] },
    ],
  },
  apis: ['./routes/*.js'], // Ruta a tus archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;