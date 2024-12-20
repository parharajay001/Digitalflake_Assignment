import { Router } from 'express';
import { addState, deleteState, getStateById, getStates, updateState } from '../controllers/state.controller';
import { authMiddleware } from '../middleware/auth.middleware';

// Create a new router instance
const router: Router = Router();

// Define routes
router.get('/', authMiddleware, getStates);
router.get('/:id', authMiddleware, getStateById);
router.post('/', authMiddleware, addState);
router.put('/:id', authMiddleware, updateState);
router.delete('/:id', authMiddleware, deleteState);

// Export the router
export default router;
