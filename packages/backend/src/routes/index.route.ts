import { Router, Request, Response, NextFunction } from 'express';

// Create a new router
const router: Router = Router();

// GET home page
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello world !');
});

// Export the router
export default router;
