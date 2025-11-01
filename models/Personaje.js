import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: Number,
  altura: Number,
  peso: Number,
  imagen: { type: String, required: true }
});
export default mongoose.model('Personaje', schema);
