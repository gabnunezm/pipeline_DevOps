const request = require('supertest');
const express = require('express');

// Configurar aplicación para pruebas unitarias
const app = express();
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend!' });
});

describe('GET /api/saludo', () => {
  it('debe responder con un mensaje de saludo', async () => {
    const res = await request(app).get('/api/saludo');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('mensaje', 'Hola desde el backend!');
  });
});
