const mongoose = require('mongoose');

const disponibilidadSchema =
new mongoose.Schema({

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
  }

},
{
  timestamps: true
});

module.exports = mongoose.model(
  'Disponibilidad',
  disponibilidadSchema
);