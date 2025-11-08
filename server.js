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

// cors
app.use(cors());

app.use(express.json());

// ✅ Conexión a Mongo
await connectDB();

const specs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// ✅ Rutas
app.use('/api/personajes', caballerosRoutes);

const PORT = process.env.PORT || 10001;
app.listen(PORT, () => console.log(`🚀 NoSQL server running on port ${PORT}`));
