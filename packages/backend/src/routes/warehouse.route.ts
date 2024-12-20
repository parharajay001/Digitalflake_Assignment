import { Router } from 'express';
import { getWarehouses, getWarehouseById, addWarehouse, updateWarehouse, deleteWarehouse } from '../controllers/warehouse.controller';
import { authMiddleware } from '../middleware/auth.middleware';

// Create a new router instance
const router: Router = Router();

// Define routes
router.get('/', authMiddleware, getWarehouses);
router.get('/:id', authMiddleware, getWarehouseById);
router.post('/', authMiddleware, addWarehouse);
router.put('/:id', authMiddleware, updateWarehouse);
router.delete('/:id', authMiddleware, deleteWarehouse);

// Export the router
export default router;
