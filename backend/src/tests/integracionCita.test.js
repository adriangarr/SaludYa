// src/tests/integracionCita.test.js

const request = require('supertest');
const app = require('../app');

describe('Integración Citas', () => {

  test('Crear y consultar cita', async () => {

    await request(app)
      .post('/api/citas')
      .send({

        pacienteId: '111',

        pacienteNombre: 'Sergio Garrido',

        medicoId: '222',

        medicoNombre: 'Dr Prueba',

        fecha: '2026-06-10',

        horaInicio: '07:00 AM',

        horaFin: '08:00 AM'

      });

    const response = await request(app)
      .get('/api/citas/paciente/111');

    expect(response.statusCode)
      .toBe(200);

    expect(Array.isArray(response.body))
      .toBe(true);

  });

});