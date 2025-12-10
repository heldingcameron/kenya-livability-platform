import { Router } from 'express';
import {
    getAllBuildings,
    getBuildingById,
    searchBuildings,
} from '../controllers/building.controller.js';

const router = Router();

// Public routes (no authentication required for viewing buildings)
router.get('/', getAllBuildings);
router.get('/search', searchBuildings);
router.get('/:id', getBuildingById);

export default router;
