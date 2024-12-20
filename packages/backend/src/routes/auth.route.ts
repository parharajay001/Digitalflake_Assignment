import express from 'express';
import { register, login } from '../controllers/auth.controller'; // Import controller functions

const router = express.Router();

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

export default router;
