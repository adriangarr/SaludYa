// src/tests/app.test.js

const request = require('supertest');
const app = require('../app');

describe('API SaludYa', () => {

  test('Debe responder API SaludYa funcionando', async () => {

    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('API SaludYa');

  });

});