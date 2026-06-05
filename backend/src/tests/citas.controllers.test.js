// src/tests/citas.test.js

const request = require('supertest');
const app = require('../app');

describe('Citas', () => {

  test('Debe crear una cita', async () => {

    const response = await request(app)
      .post('/api/citas')
      .send({

        pacienteId: '6a1372f795f326b4fd3296a5',

        pacienteNombre: 'Sergio Garrido',

        medicoId: '6a1376d5067cc41429463a3d',

        medicoNombre: 'carlo duarte',

        fecha: '2026-06-05',

        horaInicio: '12:00 PM',

        horaFin: '01:00 PM'

      });

    expect(response.statusCode)
      .toBe(201);

    expect(response.body.message)
      .toBe('Cita creada correctamente');

  });

});