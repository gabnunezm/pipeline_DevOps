const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const winston = require('winston');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Logger con Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// Middleware de logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Conexión a la base de datos
async function connectDB() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    logger.info('Conexión a la base de datos establecida');
    return conn;
  } catch (err) {
    logger.error('Error conectando a la base de datos', err);
  }
}

// Endpoints
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend!' });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Solo arrancar el server si se ejecuta directamente
if (require.main === module) {
  app.listen(port, async () => {
    await connectDB();
    logger.info(`Servidor corriendo en http://localhost:${port}`);
  });
}

// Exportar la app para los tests
module.exports = app;