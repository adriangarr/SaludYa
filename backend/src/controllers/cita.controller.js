/**
 * Crear una nueva cita médica
 * @route POST /api/citas
 * @param {Object} req
 * @param {Object} res
 */
const Cita = require('../models/Cita');

const crearCita = async (req, res) => {

  try {

    const cita = await Cita.create(
      req.body
    );

    res.status(201).json({
      message:
        'Cita creada correctamente',
      cita
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const obtenerCitasPaciente =
async (req, res) => {

  try {

    const citas =
      await Cita.find({
        pacienteId:
        req.params.pacienteId
      });

    res.json(citas);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const obtenerCitasMedico = async (req, res) => {

  try {

    const citas = await Cita.find({

      medicoId:
      req.params.medicoId

    });

    res.json(citas);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const cancelarCita = async (req, res) => {

  try {

    const cita =
      await Cita.findByIdAndUpdate(

        req.params.id,

        {
          estado: 'Cancelada'
        },

        {
          new: true
        }

      );

    res.json({

      message:
      'Cita cancelada',

      cita

    });

  } catch (error) {

    res.status(500).json({

      message:
      error.message

    });

  }

};

module.exports = {
  crearCita,
  obtenerCitasPaciente,
  obtenerCitasMedico,
  cancelarCita
};