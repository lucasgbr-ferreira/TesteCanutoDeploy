import express from 'express';
import { getClientProfile, updateClient } from '../controllers/clientController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/me', authMiddleware, getClientProfile);
router.put('/me', authMiddleware, updateClient);

export default router;
