// import express from 'express';
// import {
//   listarComentarios,
//   eliminarComentario,
//   ocultarComentario,
//   destacarComentario
// } from '../controllers/admin.controller.js';

// const router = express.Router();

// router.get('/comentarios', listarComentarios);

// router.delete('/comentarios/:id', eliminarComentario);
// router.patch('/comentarios/:id/ocultar', ocultarComentario);
// router.patch('/comentarios/:id/destacar', destacarComentario);

// export default router;

import express from 'express';
import { listarComentarios, eliminarComentario, toggleDestacado } from '../controllers/admin.controller.js';
const router = express.Router();

router.get('/comentarios', listarComentarios);
router.delete('/comentarios/:id', eliminarComentario);
router.patch('/comentarios/:id/destacar', toggleDestacado);

export default router;
