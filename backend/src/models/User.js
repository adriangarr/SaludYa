const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    nombreCompleto: {
      type: String,
      required: true,
    },

    documento: {
      type: String,
      required: true,
      unique: true,
    },

    correo: {
      type: String,
      required: true,
      unique: true,
    },

    celular: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    tipoUsuario: {
      type: String,
      enum: ['paciente', 'medico'],
      required: true,
    },

    tokenMedico: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);