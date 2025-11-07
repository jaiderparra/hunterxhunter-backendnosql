const express = require('express');
const Personaje = require('../models/Personaje');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Personaje:
 *       type: object
 *       required:
 *         - nombre
 *         - imagen
 *       properties:
 *         id:
 *           type: string
 *         nombre:
 *           type: string
 *         edad:
 *           type: integer
 *         altura:
 *           type: number
 *         peso:
 *           type: number
 *         imagen:
 *           type: string
 */

/**
 * @swagger
 * /api/personajes:
 *   get:
 *     summary: Obtener todos los personajes (NoSQL)
 *     responses:
 *       200:
 *         description: Lista de personajes
 */
router.get('/', async (req, res) => {
  const list = await Personaje.find();
  res.json(list);
});

/**
 * @swagger
 * /api/personajes:
 *   post:
 *     summary: Crear un personaje (NoSQL)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Personaje'
 *     responses:
 *       201:
 *         description: Creado
 */
router.post('/', async (req, res) => {
  try {
    const p = new Personaje(req.body);
    const saved = await p.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/personajes/{id}:
 *   get:
 *     summary: Obtener personaje por id (NoSQL)
 */
router.get('/:id', async (req, res) => {
  try {
    const p = await Personaje.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'No encontrado' });
    res.json(p);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @swagger
 * /api/personajes/{id}:
 *   put:
 *     summary: Actualizar personaje (NoSQL)
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await Personaje.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @swagger
 * /api/personajes/{id}:
 *   delete:
 *     summary: Eliminar personaje (NoSQL)
 */
router.delete('/:id', async (req, res) => {
  try {
    await Personaje.findByIdAndDelete(req.params.id);
    res.json({ deleted: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
