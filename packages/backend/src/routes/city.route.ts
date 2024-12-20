import { Router } from 'express';
import { addCity, deleteCity, getCityById, getCities, updateCity } from '../controllers/city.controller';
import { authMiddleware } from '../middleware/auth.middleware';

// Create a new router instance
const router: Router = Router();

// Define routes
router.get('/', authMiddleware, getCities);
router.get('/:id', authMiddleware, getCityById);
router.post('/', authMiddleware, addCity);
router.put('/:id', authMiddleware, updateCity);
router.delete('/:id', authMiddleware, deleteCity);

// Export the router
export default router;
