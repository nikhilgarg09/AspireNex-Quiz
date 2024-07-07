import express from 'express';
import { SignUp,getme,login } from '../controllers/authControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/signup', SignUp);
router.post('/login', login);
router.get('/getme',authMiddleware,getme);
export default router;
