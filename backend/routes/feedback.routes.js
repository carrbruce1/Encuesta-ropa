import express from 'express';
import { guardarFeedback, obtenerComentarios } from '../controllers/feedback.controller.js';

const router = express.Router();

// Guardar feedback
router.post('/', guardarFeedback);
router.post('/feedback', guardarFeedback);

// Obtener todos los comentarios
router.get('/comentarios', obtenerComentarios);

export default router;
