import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import connectDB from './db.js';
import cazadoresRoutes from './routes/cazadores.js';
import { swaggerOptions } from './openapi.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
await connectDB();

// Swagger 
const specs = swaggerJsdoc(swaggerOptions);


console.log('📘 Swagger rutas detectadas:', Object.keys(specs.paths || {}));

app.use('docs', swaggerUi.serve, swaggerUi.setup(specs));

//  Rutas principales
app.use('/api/personajes', cazadoresRoutes);

const PORT = process.env.PORT || 10001;
app.listen(PORT, () => console.log(`🚀 Servidor NoSQL corriendo en puerto ${PORT}`));
