import { Router } from 'express';
import { RfqController } from '@/controllers/rfqController';

const router = Router();

// POST /api/v1/rfq - Submit enterprise quotation request
router.post('/', RfqController.createRfq);

export default router;
