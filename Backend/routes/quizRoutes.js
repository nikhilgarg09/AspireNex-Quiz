import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createquiz, getquiz, getquizzes,deleteQuiz, submitquiz } from '../controllers/quizControllers.js';
const router = express.Router();

router.post('/create', authMiddleware, createquiz);
router.get('/', getquizzes);
router.delete('/:id', deleteQuiz);
router.get('/:id', getquiz);
router.post('/submit/:id',submitquiz);

export default router;
