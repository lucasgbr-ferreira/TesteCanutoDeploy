import sequelize from '../config/database.js';
import User from './User.js';
import Client from './Client.js';
import Concessionaria from './Concessionaria.js';
import Veiculo from './Veiculo.js';
import UserPhoto from './UserPhoto.js';
import VeiculoPhoto from './VeiculoPhoto.js';

// Definição das associações
User.hasOne(Client, { foreignKey: 'user_id', as: 'client' });
Client.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Concessionaria, { foreignKey: 'user_id', as: 'concessionaria' });
Concessionaria.belongsTo(User, { foreignKey: 'user_id' });

Concessionaria.hasMany(Veiculo, { foreignKey: 'concessionaria_id', as: 'veiculos' });
Veiculo.belongsTo(Concessionaria, { foreignKey: 'concessionaria_id', as: 'concessionaria' });

User.hasMany(UserPhoto, { foreignKey: 'user_id', as: 'photos' });
UserPhoto.belongsTo(User, { foreignKey: 'user_id' });

Veiculo.hasMany(VeiculoPhoto, { foreignKey: 'veiculo_id', as: 'photos' });
VeiculoPhoto.belongsTo(Veiculo, { foreignKey: 'veiculo_id' });

export {
  sequelize,
  User,
  Client,
  Concessionaria,
  Veiculo,
  UserPhoto,
  VeiculoPhoto
};