import { Router } from 'express';
import { getUserReports } from '../controllers/report.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// Get current user's reports
router.get('/my-reports', authenticate, getUserReports);

export default router;
