// backendnosql/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    console.log("🔌 Intentando conectar a MongoDB Atlas...");
    console.log("🧩 URI:", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10001, // evita quedarse colgado
    });

    console.log(`✅ Conectado a MongoDB Atlas (NoSQL): ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ Error DB:', err);
    process.exit(1);
  }
};

export default connectDB;
