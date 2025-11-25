// server/src/controllers/veiculoController.js
import { Veiculo, Concessionaria, VeiculoPhoto } from '../models/index.js';
import sequelize from '../config/database.js';

// ========================================
// CRUD PRIVADO – SOMENTE CONCESSIONÁRIA
// ========================================

// =============================
// CREATE
// =============================
export const createVeiculo = async (req, res) => {
  if (req.user.role !== 'concessionaria') {
    return res.status(403).json({ message: 'Acesso negado: Apenas concessionárias' });
  }

  const t = await sequelize.transaction();
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

    const dados = req.body;

    if (!dados.placa || !dados.modelo || !dados.marca) {
      await t.rollback();
      return res.status(400).json({ message: 'Placa, modelo e marca são obrigatórios' });
    }

    dados.placa = dados.placa.toUpperCase().replace(/\s/g, '');

    const dadosProcessados = {
      ...dados,
      ano: dados.ano ? parseInt(dados.ano) : null,
      preco: dados.preco ? parseFloat(dados.preco) : null,
      quilometragem: dados.quilometragem ? parseInt(dados.quilometragem) : null,
      concessionaria_id: req.user.concessionaria_id,
    };

    // REMOVIDO: imagemUrl do processamento
    delete dadosProcessados.imagemUrl;

    const novoVeiculo = await Veiculo.create(dadosProcessados, { transaction: t });
    
    await t.commit();
    res.status(201).json(novoVeiculo);

  } catch (error) {
    await t.rollback();
    console.error('Erro ao criar veículo:', error);
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(e => e.message);
      return res.status(400).json({ message: 'Erro de validação', errors });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Placa já cadastrada no sistema' });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getAllVeiculos = async (req, res) => {
  if (req.user.role !== 'concessionaria') {
    return res.status(403).json({ message: 'Acesso negado: Apenas concessionárias' });
  }

  try {
    const veiculos = await Veiculo.findAll({
      where: { concessionaria_id: req.user.concessionaria_id },
      include: [{
        model: VeiculoPhoto,
        as: 'photos',
        attributes: ['id', 'filename', 'content_type', 'size', 'created_at']
      }],
      order: [['createdAt', 'DESC']],
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
    console.error('Erro ao buscar estoque:', error);
    res.status(500).json({ message: 'Erro ao carregar estoque' });
  }
};

export const updateVeiculo = async (req, res) => {
  if (req.user.role !== 'concessionaria') {
    return res.status(403).json({ message: 'Acesso negado' });
  }

    if (!veiculo) {
      return res.status(404).json({
        message: "Veículo não encontrado"
      });
  const t = await sequelize.transaction();
  try {
    const veiculo = await Veiculo.findByPk(req.params.id);
    if (!veiculo || veiculo.concessionaria_id !== req.user.concessionaria_id) {
      await t.rollback();
      return res.status(403).json({ message: 'Veículo não pertence à sua concessionária' });
    }

    if (req.body.placa) {
      req.body.placa = req.body.placa.toUpperCase().replace(/\s/g, '');
    }

    const dados = {
      ...req.body,
      ano: req.body.ano ? parseInt(req.body.ano) : undefined,
      preco: req.body.preco ? parseFloat(req.body.preco) : undefined,
      quilometragem: req.body.quilometragem ? parseInt(req.body.quilometragem) : undefined,
    };

    await veiculo.update(dadosAtualizados);
    res.status(200).json(veiculo);

    // REMOVIDO: imagemUrl dos dados
    delete dados.imagemUrl;

    await veiculo.update(dados, { transaction: t });
    await t.commit();
    
    // Buscar veículo atualizado com fotos
    const veiculoAtualizado = await Veiculo.findByPk(req.params.id, {
      include: [{
        model: VeiculoPhoto,
        as: 'photos',
        attributes: ['id', 'filename', 'content_type', 'size', 'created_at']
      }]
    });
    
    res.status(200).json(veiculoAtualizado);
  } catch (error) {
    await t.rollback();
    console.error('Erro ao atualizar veículo:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Placa já cadastrada' });
    }
    res.status(500).json({ message: 'Erro ao atualizar veículo' });
  }
};

export const deleteVeiculo = async (req, res) => {
  if (req.user.role !== 'concessionaria') {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  const t = await sequelize.transaction();
  try {
    const veiculo = await Veiculo.findByPk(req.params.id);
    if (!veiculo || veiculo.concessionaria_id !== req.user.concessionaria_id) {
      await t.rollback();
      return res.status(403).json({ message: 'Veículo não encontrado' });
    }

    // Deletar fotos associadas primeiro
    await VeiculoPhoto.destroy({
      where: { veiculo_id: req.params.id },
      transaction: t
    });

    await veiculo.destroy({ transaction: t });
    await t.commit();
    
    res.status(204).send();
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: 'Erro ao deletar veículo' });
  }
};

// ========================================
// CATÁLOGO – ACESSÍVEL POR CLIENTES LOGADOS
// ========================================
export const getCatalogoVeiculos = async (req, res) => {
  if (!['client', 'concessionaria', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Acesso negado. Verifique suas permissões.' });
  }

  try {
    const veiculos = await Veiculo.findAll({
      where: {
        status: 'Disponível'
      },
      include: [
        {
          model: Concessionaria,
          as: 'concessionaria',
          attributes: ['nome', 'telefone', 'email_comercial', 'endereco'],
        },
        {
          model: VeiculoPhoto,
          as: 'photos',
          attributes: ['id', 'filename', 'content_type', 'size', 'created_at']
        }
      ],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(veiculos);
  } catch (error) {
    console.error('Erro ao carregar catálogo:', error);
    res.status(500).json({ message: 'Erro ao carregar catálogo' });
  }
};

