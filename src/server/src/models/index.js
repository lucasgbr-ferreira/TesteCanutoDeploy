import sequelize from '../config/database.js';
import User from './User.js';
import UserPhoto from './UserPhoto.js';
import Client from './Client.js';
import Concessionaria from './Concessionaria.js';
import Veiculo from './Veiculo.js';

// --- Associações de User ---
User.hasMany(UserPhoto, { foreignKey: 'user_id', as: 'photos' });
UserPhoto.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasOne(Client, { foreignKey: 'user_id', as: 'client' });
Client.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasOne(Concessionaria, { foreignKey: 'user_id', as: 'gestor' });
Concessionaria.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// --- Associações de Concessionaria e Veiculo ---
Concessionaria.hasMany(Veiculo, { foreignKey: 'concessionaria_id', as: 'veiculos' });
Veiculo.belongsTo(Concessionaria, { foreignKey: 'concessionaria_id', as: 'concessionaria' });

export { 
  sequelize, 
  User, 
  UserPhoto, 
  Client, 
  Concessionaria, 
  Veiculo
};