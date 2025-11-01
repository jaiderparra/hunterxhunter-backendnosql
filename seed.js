// backendnosql/seed.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './db.js';
import Personaje from './models/Personaje.js';

dotenv.config();

const personajes = [
  {
    nombre: "Gon Freecss",
    edad: 12,
    altura: 154,
    peso: 49,
    imagen: "https://static.wikia.nocookie.net/hunterxhunter/images/1/12/Gon2011.png",
    descripcion: "Un joven cazador con gran determinación."
  },
  {
    nombre: "Killua Zoldyck",
    edad: 12,
    altura: 158,
    peso: 45,
    imagen: "https://static.wikia.nocookie.net/hunterxhunter/images/3/3e/Killua_2011.png",
    descripcion: "Asesino profesional de la familia Zoldyck."
  },
  // ...agrega más personajes
];

const seedData = async () => {
  try {
    await connectDB();
    console.log("🗑️  Eliminando personajes existentes...");
    await Personaje.deleteMany();
    console.log("🌱 Insertando nuevos personajes...");
    await Personaje.insertMany(personajes);
    console.log("✅ Datos insertados correctamente!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error al insertar datos:", error);
    process.exit(1);
  }
};

seedData();
