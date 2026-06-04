const express = require('express');
const router = express.Router();

const {
  guardarDisponibilidad,
  obtenerDisponibilidadPorFecha
} = require(
  '../controllers/disponibilidad.controller'
);

router.post(
  '/',
  guardarDisponibilidad
);

router.get(
  '/:fecha',
  obtenerDisponibilidadPorFecha
);

module.exports = router;