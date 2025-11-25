import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const VeiculoPhoto = sequelize.define('VeiculoPhoto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  veiculo_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  filename: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  content_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  data: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true
  }
}, {
  tableName: 'veiculo_photos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default VeiculoPhoto;