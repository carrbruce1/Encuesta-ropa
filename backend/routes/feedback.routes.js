import express from 'express';
import { guardarFeedback } from '../controllers/feedback.controller.js';

const router = express.Router();

router.post('/', guardarFeedback);

// export default router;


router.post('/feedback', guardarFeedback);

// Obtener todos los comentarios
router.get('/comentarios', obtenerComentarios);

export default router;