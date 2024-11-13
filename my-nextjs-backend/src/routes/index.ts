import { Router } from 'express';
import healthRoutes from './health.routes';
import keyRoutes from './keys.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/v1/keys', keyRoutes);

export const routes = router; 