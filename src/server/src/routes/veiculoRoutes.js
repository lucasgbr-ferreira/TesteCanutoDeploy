// server/src/routes/veiculoRoutes.js
import express from 'express';
import { 
  createVeiculo,
  getAllVeiculos,
  getVeiculo,
  updateVeiculo,
  deleteVeiculo
} from '../controllers/veiculoController.js';

const router = express.Router();

console.log('✅ Rotas de veículo carregadas');

router.post('/', createVeiculo);

router.get('/', getAllVeiculos);

router.get('/:id', getVeiculo);

router.put('/:id', updateVeiculo);

router.delete('/:id', deleteVeiculo);

export default router;
