import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {

  const usuario = JSON.parse(
    localStorage.getItem('usuario')
  );

  // No ha iniciado sesión
  if (!usuario) {
    return <Navigate to="/" />;
  }

  // Validar rol
  if (role && usuario.tipoUsuario !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;