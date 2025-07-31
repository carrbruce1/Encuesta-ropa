import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import feedbackRoutes from './routes/feedback.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/js', express.static(path.join(__dirname, '../js')));

// Ruta principal para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Usar rutas API
app.use('/api/feedback', feedbackRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
