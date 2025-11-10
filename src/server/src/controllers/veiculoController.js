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

    // VALIDAÇÃO ADICIONAL: Garantir que campos numéricos sejam convertidos
    const dadosProcessados = {
      ...dadosVeiculo,
      ano: dadosVeiculo.ano ? parseInt(dadosVeiculo.ano) : null,
      preco: dadosVeiculo.preco ? parseFloat(dadosVeiculo.preco) : null,
      quilometragem: dadosVeiculo.quilometragem ? parseInt(dadosVeiculo.quilometragem) : null
    };

    const novoVeiculo = await Veiculo.create(dadosProcessados); 
    res.status(201).json(novoVeiculo);
  } catch (error) {
    console.error('Erro detalhado ao criar veículo:', error);
    
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
    // Adicionar mais tipos de erro do Sequelize
    if (error.name === 'SequelizeDatabaseError') {
      return res.status(400).json({ 
        message: 'Erro no banco de dados: ' + error.message 
      });
    }
    
    res.status(500).json({ 
      message: 'Erro interno ao cadastrar veículo',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno do servidor'
    });
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
    console.error('Erro ao buscar veículos:', error);
    res.status(500).json({ 
      message: 'Erro ao buscar veículos', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno do servidor'
    });
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

    // Processar campos numéricos
    const dadosAtualizados = {
      ...req.body,
      ano: req.body.ano ? parseInt(req.body.ano) : null,
      preco: req.body.preco ? parseFloat(req.body.preco) : null,
      quilometragem: req.body.quilometragem ? parseInt(req.body.quilometragem) : null
    };

    await veiculo.update(dadosAtualizados);
    
    res.status(200).json(veiculo); 
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
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
    res.status(500).json({ 
      message: 'Erro ao atualizar veículo', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno do servidor'
    });
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
    console.error('Erro ao deletar veículo:', error);
    res.status(500).json({ 
      message: 'Erro ao deletar veículo', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno do servidor'
    });
  }
};