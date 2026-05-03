const express = require('express');
const cors = require('cors');

// Importar rutas
const testRoutes = require('./routes/test.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.send('API SaludYa funcionando 🚀');
});

// Conectar rutas
app.use('/api', testRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;