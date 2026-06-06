import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

import {
  FaUser,
  FaIdCard,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUserMd
} from 'react-icons/fa';

function Register() {

  const [tipoUsuario, setTipoUsuario] = useState('');

  const [formData, setFormData] = useState({
    nombreCompleto: '',
    documento: '',
    correo: '',
    celular: '',
    password: '',
    confirmarPassword: '',
    tipoUsuario: '',
    tokenMedico: ''
  });

  const [mensaje, setMensaje] = useState('');

  // Capturar cambios
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmarPassword) {
      setMensaje('Las contraseñas no coinciden ❌');
      return;
    }

    try {

      const response = await fetch(
        'https://saludya-backend-539x.onrender.com/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            nombreCompleto: formData.nombreCompleto,
            documento: formData.documento,
            correo: formData.correo,
            celular: formData.celular,
            password: formData.password,
            tipoUsuario: formData.tipoUsuario,
            tokenMedico: formData.tokenMedico
          })
        }
      );

      const data = await response.json();

      if (response.ok) {

        setMensaje('Usuario registrado correctamente ✅');

        setFormData({
          nombreCompleto: '',
          documento: '',
          correo: '',
          celular: '',
          password: '',
          confirmarPassword: '',
          tipoUsuario: '',
          tokenMedico: ''
        });

        setTipoUsuario('');

      } else {
        setMensaje(data.message);
      }

    } catch (error) {
  console.error(error);
  setMensaje('Error conectando servidor ❌');
}
  };

  return (
    <div className="container">

      <div className="card">

        <div className="logo">
          <h1>🏥</h1>
          <h2>SaludYa</h2>
          <p>Crea tu cuenta</p>
          <span>Completa tus datos personales</span>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {/* Nombre */}
            <div className="input-group">
              <label>NOMBRE COMPLETO</label>

              <div className="input-box">
                <FaUser className="icon" />

                <input
                  type="text"
                  name="nombreCompleto"
                  placeholder="Ingresa tu nombre completo"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div className="input-group">
              <label>CONFIRMAR CONTRASEÑA</label>

              <div className="input-box">
                <FaLock className="icon" />

                <input
                  type="password"
                  name="confirmarPassword"
                  placeholder="Confirmar tu contraseña"
                  value={formData.confirmarPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Documento */}
            <div className="input-group">
              <label>DOCUMENTO</label>

              <div className="input-box">
                <FaIdCard className="icon" />

                <input
                  type="text"
                  name="documento"
                  placeholder="Ingresa tu número de documento"
                  value={formData.documento}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Celular */}
            <div className="input-group">
              <label>CELULAR</label>

              <div className="input-box">
                <FaPhone className="icon" />

                <input
                  type="text"
                  name="celular"
                  placeholder="Ingresa tu número celular"
                  value={formData.celular}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Correo */}
            <div className="input-group">
              <label>CORREO</label>

              <div className="input-box">
                <FaEnvelope className="icon" />

                <input
                  type="email"
                  name="correo"
                  placeholder="Ingresa tu correo electrónico"
                  value={formData.correo}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Tipo usuario */}
            <div className="input-group">
              <label>TIPO DE USUARIO</label>

              <div className="input-box">
                <FaUserMd className="icon" />

                <select
                  name="tipoUsuario"
                  value={tipoUsuario}
                  onChange={(e) => {
                    setTipoUsuario(e.target.value);

                    setFormData({
                      ...formData,
                      tipoUsuario: e.target.value
                    });
                  }}
                >
                  <option value="">
                    Selecciona una opción
                  </option>

                  <option value="paciente">
                    Paciente
                  </option>

                  <option value="medico">
                    Médico
                  </option>
                </select>
              </div>
            </div>

            {/* Contraseña */}
            <div className="input-group">
              <label>CONTRASEÑA</label>

              <div className="input-box">
                <FaLock className="icon" />

                <input
                  type="password"
                  name="password"
                  placeholder="Crea tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Token Médico */}
            {tipoUsuario === 'medico' && (
              <div className="input-group">
                <label>TOKEN MÉDICO</label>

                <div className="input-box">
                  <FaLock className="icon" />

                  <input
                    type="password"
                    name="tokenMedico"
                    placeholder="Ingresa token médico"
                    value={formData.tokenMedico}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

          </div>

          <button
            type="submit"
            className="btn-register"
          >
            Registrarme
          </button>

          {mensaje && (
            <p className="mensaje">
              {mensaje}
            </p>
          )}

          <p className="login-link">
            ¿Ya tienes cuenta?
            <Link to="/"> Iniciar sesión</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;