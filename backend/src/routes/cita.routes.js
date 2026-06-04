const express = require('express');

const router = express.Router();


const Cita = require('../models/Cita');


const {
  crearCita,
  obtenerCitasPaciente,
  obtenerCitasMedico,
  cancelarCita
  
} = require('../controllers/cita.controller');

router.post(
  '/',
  crearCita
);


router.get(
  '/medico/:medicoId',
  obtenerCitasMedico
);

router.put(
  '/:id/cancelar',
  cancelarCita
);

router.get(
  '/paciente/:pacienteId',
  obtenerCitasPaciente
);

router.delete('/:id', async (req, res) => {

  try {

    await Cita.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: 'Cita eliminada correctamente'
    });

  } catch (error) {

    res.status(500).json({
      message: 'Error eliminando cita'
    });

  }

});

module.exports = router;