const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema(
{
  pacienteId: {
    type: String,
    required: true
  },

  pacienteNombre: {
    type: String,
    required: true
  },

  medicoId: {
    type: String,
    required: true
  },

  medicoNombre: {
    type: String,
    required: true
  },

  fecha: {
    type: String,
    required: true
  },

  horaInicio: {
    type: String,
    required: true
  },

  horaFin: {
    type: String,
    required: true
  },

  estado: {
    type: String,
    default: 'Confirmada'
  }

},
{
  timestamps: true
});

module.exports = mongoose.model(
  'Cita',
  citaSchema
);