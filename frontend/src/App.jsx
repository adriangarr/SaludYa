import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import DashboardPaciente from './pages/DashboardPaciente';
import DashboardMedico from './pages/DashboardMedico';

// IMPORTANTE
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Registro */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard Paciente protegido */}
        <Route
          path="/paciente"
          element={
            <ProtectedRoute role="paciente">
              <DashboardPaciente />
            </ProtectedRoute>
          }
        />

        {/* Dashboard Médico protegido */}
        <Route
          path="/medico"
          element={
            <ProtectedRoute role="medico">
              <DashboardMedico />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;