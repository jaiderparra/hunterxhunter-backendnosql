import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import connectDB from './db.js';
import caballerosRoutes from './routes/cazadores.js';
import { swaggerOptions } from './openapi.js';

dotenv.config();
const app = express();

// ✅ CORS configurado explícitamente
app.use(cors({
  origin: "*", // puedes cambiarlo a tu dominio de frontend si deseas más seguridad
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// 🔌 Conexión a Mongo
await connectDB();

// 📘 Swagger
const specs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// 🧩 Rutas
app.use('/api/personajes', caballerosRoutes);

const PORT = process.env.PORT || 10001;
app.listen(PORT, () => console.log(`🚀 NoSQL server running on port ${PORT}`));
