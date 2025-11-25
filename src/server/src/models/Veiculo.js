// Veiculo.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Veiculo = sequelize.define('Veiculo', {
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Placa não pode estar vazia' },
      len: { args: [7, 8], msg: 'Placa deve ter entre 7 e 8 caracteres' }
    }
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Modelo não pode estar vazia' },
      len: { args: [2, 100], msg: 'Modelo deve ter entre 2 e 100 caracteres' }
    }
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Marca não pode estar vazia' },
      len: { args: [2, 50], msg: 'Marca deve ter entre 2 e 50 caracteres' }
    }
  },
  ano: {
    type: DataTypes.INTEGER,
    validate: {
      min: { args: [1900], msg: 'Ano deve ser maior que 1900' },
      max: { args: [new Date().getFullYear() + 1], msg: 'Ano não pode ser no futuro' }
    }
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    validate: {
      min: { args: [0], msg: 'Preço não pode ser negativo' }
    }
  },
  // REMOVIDO: imagemUrl
  especificacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  historico: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  laudoTecnico: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  quilometragem: {
    type: DataTypes.INTEGER,
    validate: {
      min: { args: [0], msg: 'Quilometragem não pode ser negativa' }
    }
  },
  cor: {
    type: DataTypes.STRING,
    validate: {
      len: { args: [2, 30], msg: 'Cor deve ter entre 2 e 30 caracteres' }
    }
  },
  combustivel: {
    type: DataTypes.ENUM('Gasolina', 'Álcool', 'Diesel', 'Flex', 'Elétrico', 'Híbrido'),
    allowNull: true
  },
  cambio: {
    type: DataTypes.ENUM('Manual', 'Automático', 'Automático Sequencial', 'CVT'),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Disponível', 'Vendido', 'Em Manutenção', 'Reservado'),
    defaultValue: 'Disponível'
  },
  concessionaria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'concessionarias', key: 'id' }
  }
});

export default Veiculo;