const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuración de conexión a la base de datos
async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'mipassword',
      database: process.env.DB_NAME || 'mydatabase'
    });
    console.log('Conexión a la base de datos establecida');
    return connection;
  } catch (error) {
    console.error('Error conectando a la base de datos', error);
  }
}

// Endpoint
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend!' });
});

// Endpoint de salud para monitoreo básico
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Inicializar servidor y conectar con la base de datos
app.listen(port, async () => {
  await connectDB();
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Exportar la aplicación para pruebas
module.exports = app;
