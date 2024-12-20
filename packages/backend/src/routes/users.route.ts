import { Router } from 'express';
import { profile } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

// Create a new router instance
const router: Router = Router();

// Example of a protected route
router.get('/profile', authMiddleware, profile);

// Export the router
export default router;
