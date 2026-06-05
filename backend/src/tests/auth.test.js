const request = require('supertest');
const app = require('../app');

describe('Prueba API SaludYa', () => {

  test('Debe responder correctamente', async () => {

    const response =
      await request(app)
      .get('/');

    expect(response.statusCode)
      .toBe(200);

  });

});