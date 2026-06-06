import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function DashboardPaciente() {

  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem('usuario')
  );

  const [fecha, setFecha] = useState(new Date());

  const [horarios, setHorarios] = useState([]);

  const [misCitas, setMisCitas] = useState([]);

  const [horaSeleccionada, setHoraSeleccionada] =
    useState(null);

  useEffect(() => {

    cargarMisCitas();

  }, []);

  const cargarMisCitas = async () => {

    try {

      const response = await fetch(
        `https://saludya-backend-539x.onrender.com/api/citas/paciente/${usuario._id}`
      );

      const data = await response.json();

      setMisCitas(data);

    } catch (error) {

      console.error(error);

    }

  };

  const cerrarSesion = () => {

    localStorage.removeItem('usuario');

    navigate('/');

  };

  const seleccionarFecha = async (nuevaFecha) => {

    setFecha(nuevaFecha);

    const fechaFormateada =
      nuevaFecha.toISOString().split('T')[0];

    try {

      const response = await fetch(
        `https://saludya-backend-539x.onrender.com/api/disponibilidad/${fechaFormateada}`
      );

      const data = await response.json();

      setHorarios(data);

      setHoraSeleccionada(null);

    } catch (error) {

      console.error(error);

      setHorarios([]);

    }

  };

  const agendarCita = async () => {

    if (!horaSeleccionada) {

      alert('Selecciona una hora');

      return;

    }

    try {

      const response =
        await fetch(
          'https://saludya-backend-539x.onrender.com/api/citas',
          {
            method: 'POST',

            headers: {
              'Content-Type':
              'application/json'
            },

            body: JSON.stringify({

              pacienteId:
                usuario._id,

              pacienteNombre:
                usuario.nombreCompleto,

              medicoId:
                horaSeleccionada.medicoId,

              medicoNombre:
                horaSeleccionada.medicoNombre,

              fecha:
                horaSeleccionada.fecha,

              horaInicio:
                horaSeleccionada.horaInicio,

              horaFin:
                horaSeleccionada.horaFin

            })

          }
        );

      const data =
        await response.json();

      alert(data.message);

      cargarMisCitas();

    } catch (error) {

      console.error(error);

      alert(
        'Error creando cita'
      );

    }

  };

  const eliminarCita = async (id) => {

    const confirmar = window.confirm(
      '¿Deseas cancelar esta cita?'
    );

    if (!confirmar) return;

    try {

      const response = await fetch(
        `https://saludya-backend-539x.onrender.com/api/citas/${id}`,
        {
          method: 'DELETE'
        }
      );

      const data = await response.json();

      alert(data.message);

      cargarMisCitas();

    } catch (error) {

      console.error(error);

      alert(
        'Error eliminando cita'
      );

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
            <li>➕ Agendar cita</li>
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
              Hola, {usuario?.nombreCompleto}
            </h2>

            <p>
              Bienvenido a SaludYa
            </p>

          </div>

          <div className="top-icons">
            🔔 👤
          </div>

        </header>

        <section className="cards-row">

          <div className="card next-appointment">

            <h3>
              Próxima cita
            </h3>

            {misCitas.length > 0 ? (

              <>
                <p>
                  <strong>
                    Médico:
                  </strong>
                  {' '}
                  {misCitas[0].medicoNombre}
                </p>

                <p>
                  📅 {misCitas[0].fecha}
                </p>

                <p>
                  🕒 {misCitas[0].horaInicio}
                </p>

                <p>
                  Estado:
                  {' '}
                  {misCitas[0].estado}
                </p>
              </>

            ) : (

              <p>
                No tienes citas programadas
              </p>

            )}

          </div>

          <div className="card schedule-card">

            <h3>
              Agendar cita
            </h3>

            <Calendar
              onChange={seleccionarFecha}
              value={fecha}
            />

            <div className="hours">

              {horarios.length === 0 ? (

                <p className="sin-horarios">
                  Este día no hay horarios disponibles
                </p>

              ) : (

                horarios.map((horario) => (

                  <button
                    key={horario._id}
                    onClick={() =>
                      setHoraSeleccionada(
                        horario
                      )
                    }
                    className={
                      horaSeleccionada?._id ===
                      horario._id
                        ? 'hora-seleccionada'
                        : ''
                    }
                  >
                    {horario.horaInicio}
                    {' - '}
                    {horario.horaFin}
                  </button>

                ))

              )}

            </div>

            <button
              className="main-btn"
              onClick={agendarCita}
            >
              Agendar cita
            </button>

          </div>

        </section>

        <section className="appointments">

          <h3>
            Mis citas
          </h3>

          {misCitas.length === 0 ? (

            <p>
              No tienes citas registradas
            </p>

          ) : (

            misCitas.map((cita) => (

              <div
                key={cita._id}
                className="appointment-item"
              >

                <div>

                  <strong>
                    Cita médica
                  </strong>

                  <p>
                    Médico:
                    {' '}
                    {cita.medicoNombre}
                  </p>

                </div>

                <div>
                  {cita.fecha}
                </div>

                <div>
                  {cita.horaInicio}
                </div>

                <span className="status">
                  {cita.estado}
                </span>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    eliminarCita(cita._id)
                  }
                >
                  Cancelar
                </button>

              </div>

            ))

          )}

        </section>

      </main>

    </div>
  );
}

export default DashboardPaciente;