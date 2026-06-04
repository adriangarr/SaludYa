import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function DashboardMedico() {

  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem('usuario')
  );

  const [citas, setCitas] = useState([]);

  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');

  useEffect(() => {
    cargarCitas();
  }, []);

  const cargarCitas = async () => {

    try {

      const response = await fetch(
        `http://localhost:5000/api/citas/medico/${usuario._id}`
      );

      const data = await response.json();

      setCitas(data);

    } catch (error) {

      console.error(error);

    }

  };

  const cancelarCita = async (id) => {

    const confirmar = window.confirm(
      '¿Deseas cancelar esta cita?'
    );

    if (!confirmar) return;

    try {

      const response = await fetch(
        `http://localhost:5000/api/citas/${id}`,
        {
          method: 'DELETE'
        }
      );

      const data = await response.json();

      alert(data.message);

      cargarCitas();

    } catch (error) {

      console.error(error);

      alert('Error cancelando cita');

    }

  };

  const cerrarSesion = () => {

    localStorage.removeItem('usuario');

    navigate('/');

  };

  const guardarHorario = async () => {

    try {

      const response = await fetch(
        'http://localhost:5000/api/disponibilidad',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            medicoId: usuario._id,
            medicoNombre: usuario.nombreCompleto,
            fecha,
            horaInicio,
            horaFin
          })
        }
      );

      const data = await response.json();

      alert(data.message);

    } catch (error) {

      console.error(error);

      alert('Error guardando horario');

    }

  };

  return (
    <div className="dashboard">

      <aside className="sidebar">

        <div className="logo">
          <h2>🏥 SaludYa</h2>
        </div>

        <nav>
          <ul>
            <li className="active">🏠 Inicio</li>
            <li>📅 Mis citas</li>
            <li>👤 Perfil</li>
            <li>💬 Mensajes</li>
            <li>⚙️ Configuración</li>
          </ul>
        </nav>

        <button
          className="logout-btn"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>

      </aside>

      <main className="content">

        <header className="topbar">

          <div>
            <h2>
              Dr. {usuario?.nombreCompleto}
            </h2>

            <p>
              Bienvenido a SaludYa
            </p>
          </div>

        </header>

        <section className="cards-row">

          <div className="card agenda-card">

            <h3>Agenda del día</h3>

            <table>

              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>

                {citas.length === 0 ? (

                  <tr>
                    <td colSpan="5">
                      No hay citas agendadas
                    </td>
                  </tr>

                ) : (

                  citas.map((cita) => (

                    <tr key={cita._id}>

                      <td>
                        {cita.pacienteNombre}
                      </td>

                      <td>
                        {cita.fecha}
                      </td>

                      <td>
                        {cita.horaInicio}
                      </td>

                      <td>
                        {cita.estado}
                      </td>

                      <td>

                        <button
                          className="cancel-btn"
                          onClick={() =>
                            cancelarCita(cita._id)
                          }
                        >
                          Cancelar
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          <div className="card disponibilidad-card">

            <h3>
              Gestionar disponibilidad
            </h3>

            <input
              type="date"
              value={fecha}
              onChange={(e) =>
                setFecha(e.target.value)
              }
            />

            <select
              value={horaInicio}
              onChange={(e) =>
                setHoraInicio(e.target.value)
              }
            >
              <option value="">
                Hora inicio
              </option>

              <option>07:00 AM</option>
              <option>08:00 AM</option>
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>01:00 PM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
              <option>04:00 PM</option>

            </select>

            <select
              value={horaFin}
              onChange={(e) =>
                setHoraFin(e.target.value)
              }
            >
              <option value="">
                Hora fin
              </option>

              <option>08:00 AM</option>
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>01:00 PM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
              <option>04:00 PM</option>
              <option>05:00 PM</option>

            </select>

            <button
              className="main-btn"
              onClick={guardarHorario}
            >
              Guardar Horario
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default DashboardMedico;