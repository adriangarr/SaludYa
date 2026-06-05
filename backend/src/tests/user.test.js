const User = require('../models/User');

describe('Modelo User', () => {

  test('Debe crear un usuario con todos los campos', () => {

    const usuario = new User({

      nombreCompleto: 'Sergio Garrido',

      documento: '123456789',

      correo: 'sergio@test.com',

      celular: '3001234567',

      password: '123456',

      tipoUsuario: 'paciente'

    });

    expect(usuario.nombreCompleto)
      .toBe('Sergio Garrido');

    expect(usuario.documento)
      .toBe('123456789');

    expect(usuario.correo)
      .toBe('sergio@test.com');

    expect(usuario.tipoUsuario)
      .toBe('paciente');

  });

});