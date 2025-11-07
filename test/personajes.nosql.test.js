const request = require('supertest');
const express = require('express');

jest.mock('../models/Personaje', () => {
  return jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue({
      _id: '123',
      nombre: 'Killua Zoldyck',
      edad: 14,
    }),
  }));
});

const Personaje = require('../models/Personaje');
Personaje.find = jest.fn();
Personaje.findById = jest.fn();

const router = require('../routes/cazadores');
const app = express();
app.use(express.json());
app.use('/api/personajes', router);

describe('Tests Personajes NoSQL', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/personajes → debe retornar lista de personajes', async () => {
    Personaje.find.mockResolvedValue([{ nombre: 'Gon Freecss', edad: 12 }]);
    const res = await request(app).get('/api/personajes');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].nombre).toBe('Gon Freecss');
  });

  test('POST /api/personajes → debe crear un personaje', async () => {
    const res = await request(app)
      .post('/api/personajes')
      .send({ nombre: 'Killua Zoldyck', edad: 14 });

    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe('Killua Zoldyck');
  });

  test('GET /api/personajes/:id → debe obtener un personaje por id', async () => {
    Personaje.findById.mockResolvedValue({ _id: '123', nombre: 'Leorio' });
    const res = await request(app).get('/api/personajes/123');
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe('Leorio');
  });
});
