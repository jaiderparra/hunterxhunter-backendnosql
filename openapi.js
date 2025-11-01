import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'API NoSQL (HunterXHunter)', version: '1.0.0' },
    servers: [{ url: process.env.BASE_URL || 'https://hunterxhunter-backendsql-production.up.railway.app' }]
  },
  apis: [path.join(__dirname, './routes/*.js'), path.join(__dirname, './models/*.js')]
};
