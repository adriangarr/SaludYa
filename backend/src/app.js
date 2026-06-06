const express = require('express');
const cors = require('cors');

// Importar rutas
const testRoutes = require('./routes/test.routes');
const authRoutes = require('./routes/auth.routes');
const disponibilidadRoutes = require('./routes/disponibilidad.routes');
const citaRoutes = require('./routes/cita.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.send('API SaludYa funcionandos 🚀');
});

// Conectar rutas
app.use('/api', testRoutes);
app.use('/api/auth', authRoutes);

// NUEVA RUTA DISPONIBILIDAD MÉDICA
app.use(
  '/api/disponibilidad',
  disponibilidadRoutes
);

//cita ruta 
app.use(
  '/api/citas',
  citaRoutes
);

//swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

module.exports = app;