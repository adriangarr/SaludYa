const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {

    const {
      nombreCompleto,
      documento,
      correo,
      celular,
      password,
      tipoUsuario,
      tokenMedico
    } = req.body;

    // validar token médico
    if (
      tipoUsuario === 'medico' &&
      tokenMedico !== '8358'
    ) {
      return res.status(400).json({
        message: 'Token médico incorrecto'
      });
    }

    const existeUsuario = await User.findOne({
      $or: [
        { correo },
        { documento }
      ]
    });

    if (existeUsuario) {
      return res.status(400).json({
        message: 'Usuario ya registrado'
      });
    }

    const nuevoUsuario = new User({
      nombreCompleto,
      documento,
      correo,
      celular,
      password,
      tipoUsuario,
      tokenMedico
    });

    await nuevoUsuario.save();

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: nuevoUsuario
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error del servidor'
    });
  }
});

module.exports = router;

// LOGIN
router.post('/login', async (req, res) => {
  try {

    const { documento, password } = req.body;

    const usuario = await User.findOne({
      documento
    });

    if (!usuario) {
      return res.status(400).json({
        message: 'Documento no registrado'
      });
    }

    if (usuario.password !== password) {
      return res.status(400).json({
        message: 'Contraseña incorrecta'
      });
    }

    res.status(200).json({
      message: 'Login exitoso ✅',
      user: usuario
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error del servidor'
    });
  }
});