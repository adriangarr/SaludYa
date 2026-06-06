import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../App.css';

import {
  FaUser,
  FaLock,
  FaEye
} from 'react-icons/fa';

function Login() {

  const navigate = useNavigate();

  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(
        'https://saludya-backend-539x.onrender.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            documento,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {


         // Guardar usuario
        localStorage.setItem(
          'usuario',
          JSON.stringify(data.user)
        );

        setMensaje('Inicio de sesión exitoso ✅');

        // Redirección por rol
        if (data.user.tipoUsuario === 'paciente') {
          navigate('/paciente');
        }

        if (data.user.tipoUsuario === 'medico') {
          navigate('/medico');
        }

      } else {
        setMensaje(data.message);
      }

    } catch (error) {
      console.error(error);
      setMensaje('No se pudo conectar al servidor');
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="login-logo">
          <h1>🏥</h1>
          <h2>SaludYa</h2>
          <p>Iniciar Sesión</p>
        </div>

        <form onSubmit={handleLogin}>

          {/* DOCUMENTO */}
          <div className="login-input-box">
            <FaUser className="login-icon" />

            <input
              type="text"
              placeholder="INGRESA TU NÚMERO DE DOCUMENTO"
              value={documento}
              onChange={(e) =>
                setDocumento(e.target.value)
              }
            />
          </div>

          {/* PASSWORD */}
          <div className="login-input-box">
            <FaLock className="login-icon" />

            <input
              type="password"
              placeholder="INGRESA TU CONTRASEÑA"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <FaEye className="login-eye" />
          </div>

          <p className="forgot-password">
            ¿Olvidaste tu contraseña?
          </p>

          <button
            type="submit"
            className="login-btn"
          >
            INICIAR SESIÓN
          </button>

          {mensaje && (
            <p className="mensaje">
              {mensaje}
            </p>
          )}

          <div className="separator">
            <span>o</span>
          </div>

          <p className="register-text">
            ¿No tienes cuenta?
          </p>

          <button
            type="button"
            className="register-btn"
            onClick={() =>
              navigate('/register')
            }
          >
            Registrarse →
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;