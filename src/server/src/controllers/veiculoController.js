// server/src/controllers/veiculoController.js
import { Veiculo } from '../models/index.js';

// =============================
// CREATE
// =============================
export const createVeiculo = async (req, res) => {
  try {
    const dadosVeiculo = req.body;

    // Campos obrigatórios
    if (!dadosVeiculo.placa || !dadosVeiculo.modelo || !dadosVeiculo.marca) {
      return res.status(400).json({
        message: 'Placa, modelo e marca são obrigatórios'
      });
    }

    // Formatar placa
    if (dadosVeiculo.placa) {
      dadosVeiculo.placa = dadosVeiculo.placa.toUpperCase().replace(/\s/g, '');
    }

    const dadosProcessados = {
      ...dadosVeiculo,
      ano: dadosVeiculo.ano ? parseInt(dadosVeiculo.ano) : null,
      preco: dadosVeiculo.preco ? parseFloat(dadosVeiculo.preco) : null,
      quilometragem: dadosVeiculo.quilometragem ? parseInt(dadosVeiculo.quilometragem) : null
    };

    const novoVeiculo = await Veiculo.create(dadosProcessados);
    res.status(201).json(novoVeiculo);

  } catch (error) {

    console.error('Erro ao criar veículo:', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(err => err.message),
      });
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Placa já cadastrada",
      });
    }

    res.status(500).json({
      message: "Erro interno ao cadastrar veículo"
    });
  }
};

// =============================
// READ ALL
// =============================
export const getAllVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(veiculos);

  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
    res.status(500).json({
      message: "Erro ao buscar veículos"
    });
  }
};

// =============================
// READ BY ID (NOVO)
// =============================
export const getVeiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) {
      return res.status(404).json({
        message: "Veículo não encontrado"
      });
    }

    res.status(200).json(veiculo);

  } catch (error) {
    console.error('Erro ao buscar veículo:', error);
    res.status(500).json({
      message: 'Erro ao buscar veículo'
    });
  }
};

// =============================
// UPDATE
// =============================
export const updateVeiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) {
      return res.status(404).json({
        message: "Veículo não encontrado"
      });
    }

    if (req.body.placa) {
      req.body.placa = req.body.placa.toUpperCase().replace(/\s/g, '');
    }

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
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(err => err.message),
      });
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: "Placa já cadastrada"
      });
    }

    res.status(500).json({
      message: "Erro ao atualizar veículo"
    });
  }
};

// =============================
// DELETE
// =============================
export const deleteVeiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) {
      return res.status(404).json({
        message: "Veículo não encontrado"
      });
    }

    await veiculo.destroy();
    res.status(204).json({ message: "Veículo deletado" });

  } catch (error) {
    console.error('Erro ao deletar veículo:', error);
    res.status(500).json({
      message: "Erro ao deletar veículo"
    });
  }
};
