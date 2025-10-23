import express from 'express';
import { register, login, refreshToken, logout } from '../controllers/authController.js';

const router = express.Router();

// Sample route for user authentication
router.post('/register', register);
router.post('/login', login);
router.get('/refresh', refreshToken);
router.post('/logout', logout);

export default router;