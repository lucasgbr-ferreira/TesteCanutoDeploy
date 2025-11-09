// server/src/controllers/veiculoController.js
import { Veiculo } from '../models/index.js';

// --- CREATE ---
export const createVeiculo = async (req, res) => {
  try {
    const dadosVeiculo = req.body;
    
    // Validação adicional no servidor
    if (!dadosVeiculo.placa || !dadosVeiculo.modelo || !dadosVeiculo.marca) {
      return res.status(400).json({ 
        message: 'Placa, modelo e marca são obrigatórios' 
      });
    }

    // Formatar placa para maiúsculas
    if (dadosVeiculo.placa) {
      dadosVeiculo.placa = dadosVeiculo.placa.toUpperCase().replace(/\s/g, '');
    }

    const novoVeiculo = await Veiculo.create(dadosVeiculo); 
    res.status(201).json(novoVeiculo);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      return res.status(400).json({ 
        message: 'Erro de validação', 
        errors 
      });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        message: 'Placa já cadastrada no sistema' 
      });
    }
    res.status(500).json({ message: 'Erro ao cadastrar veículo', error: error.message });
  }
};

// --- READ ---
export const getAllVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(veiculos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar veículos', error: error.message });
  }
};

// --- UPDATE ---
export const updateVeiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }

    // Formatar placa para maiúsculas
    if (req.body.placa) {
      req.body.placa = req.body.placa.toUpperCase().replace(/\s/g, '');
    }

    await veiculo.update(req.body);
    
    res.status(200).json(veiculo); 
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      return res.status(400).json({ 
        message: 'Erro de validação', 
        errors 
      });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        message: 'Placa já cadastrada no sistema' 
      });
    }
    res.status(500).json({ message: 'Erro ao atualizar veículo', error: error.message });
  }
};

// --- DELETE ---
export const deleteVeiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }

    await veiculo.destroy();
    
    res.status(204).json({ message: 'Veículo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar veículo', error: error.message });
  }
};