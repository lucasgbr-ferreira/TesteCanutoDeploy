// server/src/routes/veiculoRoutes.js
import express from 'express';
// Importamos todas as novas funções
import { 
  createVeiculo,
  getAllVeiculos,
  updateVeiculo,
  deleteVeiculo
} from '../controllers/veiculoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createVeiculo);

router.get('/', getAllVeiculos);

router.put('/:id', updateVeiculo);

router.delete('/:id', deleteVeiculo);

export default router;