const Disponibilidad = require('../models/Disponibilidad');

const guardarDisponibilidad = async (req, res) => {

  try {

    const disponibilidad =
      await Disponibilidad.create(req.body);

    res.status(201).json({
      message: 'Horario guardado correctamente',
      disponibilidad
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const obtenerDisponibilidadPorFecha =
async (req, res) => {

  try {

    const { fecha } = req.params;

    const hoy = new Date()
      .toISOString()
      .split('T')[0];

    // Eliminar horarios vencidos
    await Disponibilidad.deleteMany({
      fecha: { $lt: hoy }
    });

    const horarios =
      await Disponibilidad.find({ fecha });

    res.json(horarios);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  guardarDisponibilidad,
  obtenerDisponibilidadPorFecha
};