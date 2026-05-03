const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  const user = await User.findOne({ correo });

  if (!user) {
    return res.status(404).json({ message: 'Usuario no existe' });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  res.json({ message: 'Login exitoso 🔥', user });
});

module.exports = router;