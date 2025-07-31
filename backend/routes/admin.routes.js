import express from 'express';
import { listarComentarios } from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/comentarios', listarComentarios);

export default router;
