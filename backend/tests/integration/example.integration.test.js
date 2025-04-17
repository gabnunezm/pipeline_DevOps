const request = require('supertest');
const app = require('../../server'); // <-- ruta ajustada

describe('Integración API /api/saludo', () => {
  it('debe retornar saludo real desde el servidor', async () => {
    const res = await request(app).get('/api/saludo');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('mensaje');
  });
});
