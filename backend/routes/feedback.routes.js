// backend/routes/feedback.routes.js
import express from 'express';
import { guardarFeedback } from '../controllers/feedback.controller.js';

const router = express.Router();

router.post('/', guardarFeedback);

export default router;

