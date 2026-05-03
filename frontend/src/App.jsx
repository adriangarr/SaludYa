import { useState } from 'react';
import './App.css';

function App() {
  // Estados para capturar los datos del formulario
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje({ texto: 'Cargando...', tipo: 'info' });

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje({ texto: `¡Bienvenido, ${data.user.correo}! 🔥`, tipo: 'success' });
        console.log('Datos del usuario:', data.user);
      } else {
        setMensaje({ texto: data.message || 'Error al iniciar sesión', tipo: 'error' });
      }
    } catch (error) {
      setMensaje({ texto: 'No se pudo conectar con el servidor', tipo: 'error' });
    }
  };

  return (
    <div className="main-container">
      <header>
        <h1>SaludYa 🏥</h1>
        <p>Sistema de Gestión de Citas Médicas</p>
      </header>

      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="ejemplo@correo.com" 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="******" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-login">Entrar al Sistema</button>
        </form>

        {mensaje.texto && (
          <p className={`status-msg ${mensaje.tipo}`}>
            {mensaje.texto}
          </p>
        )}
      </div>

      <footer>
        <p>Ig.sergio garrido</p>
      </footer>
    </div>
  );
}

export default App;