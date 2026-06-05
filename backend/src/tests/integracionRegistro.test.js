// src/tests/integracionRegistro.test.js

const request = require('supertest');
const app = require('../app');

describe('Integración Registro', () => {

  test('Registrar usuario completo', async () => {

    const response = await request(app)
      .post('/api/auth/register')
      .send({

        nombreCompleto: 'Paciente Integracion',

        documento: Date.now().toString(),

        correo: `test${Date.now()}@gmail.com`,

        celular: '3001234567',

        password: '123456',

        tipoUsuario: 'paciente'

      });

    expect(response.statusCode)
      .toBe(201);

    expect(response.body.message)
      .toBe('Usuario registrado correctamente');

  });

});