// server/src/routes/veiculoRoutes.js
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { 
  createVeiculo,
  getAllVeiculos,
  updateVeiculo,
  deleteVeiculo,
  getVeiculosByConcessionaria
} from '../controllers/veiculoController.js';

const router = express.Router();

// Rota pública - qualquer um pode listar veículos
router.get('/', getAllVeiculos);

// Rotas protegidas - apenas concessionárias autenticadas
router.get('/meus-veiculos', authMiddleware, getVeiculosByConcessionaria);
router.post('/', authMiddleware, createVeiculo);
router.put('/:id', authMiddleware, updateVeiculo);
router.delete('/:id', authMiddleware, deleteVeiculo);

export default router;