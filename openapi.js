
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API NoSQL - Hunter x Hunter',
      version: '1.0.0',
      description: 'Documentación de la API de personajes (NoSQL)',
    },
    servers: [
      {
        url: process.env.BASE_URL || 'https://hunterxhunter-backendnosql.onrender.com',
        description: 'Servidor principal (Render)',
      },
      {
        url: 'http://localhost:10001',
        description: 'Servidor local',
      },
    ],
  },
  // @swagger
  apis: [path.resolve(__dirname, 'routes/*.js')],
};
