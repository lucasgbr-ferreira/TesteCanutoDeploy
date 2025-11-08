import express from 'express';
import { getClientProfile, updateClient } from '../controllers/clientController.js';

const router = express.Router();


router.get('/me', getClientProfile);
router.put('/me', updateClient);

export default router;
