const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API SaludYa',
      version: '1.0.0',
      description: 'Documentación API SaludYa'
    }
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);