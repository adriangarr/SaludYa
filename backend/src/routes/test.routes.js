const express = require('express');
const router = express.Router();
const User = require('../models/User');

// crear usuario rápido
router.get('/crear', async (req, res) => {
  const user = new User({
    correo: 'test@test.com',
    password: '123456'
  });

  await user.save();

  res.send('Usuario creado 🔥');
});

module.exports = router;