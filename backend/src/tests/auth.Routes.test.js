const request = require('supertest');
const app = require('../../app');

describe('Auth Routes', () => {

  test('Debe registrar un paciente correctamente', async () => {

    const response = await request(app)
      .post('/api/auth/register')
      .send({

        nombreCompleto: 'Paciente Test',

        documento: Date.now().toString(),

        correo: `test${Date.now()}@correo.com`,

        celular: '3001234567',

        password: '123456',

        tipoUsuario: 'paciente'

      });

    expect(response.statusCode)
      .toBe(201);

    expect(response.body.message)
      .toBe(
        'Usuario registrado correctamente'
      );

  });

  test('Debe iniciar sesión correctamente', async () => {

    const documento =
      Date.now().toString();

    await request(app)
      .post('/api/auth/register')
      .send({

        nombreCompleto: 'Login Test',

        documento,

        correo: `login${Date.now()}@correo.com`,

        celular: '3001234567',

        password: '123456',

        tipoUsuario: 'paciente'

      });

    const response = await request(app)
      .post('/api/auth/login')
      .send({

        documento,

        password: '123456'

      });

    expect(response.statusCode)
      .toBe(200);

    expect(response.body.message)
      .toContain('Login exitoso');

  });

});