const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: Number,
  altura: Number,
  peso: Number,
  imagen: { type: String, required: true }
});

module.exports = mongoose.model('Personaje', schema);
