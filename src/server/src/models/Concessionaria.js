import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Concessionaria = sequelize.define("Concessionaria", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  user_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: "users", key: "id" } 
  },
  nome: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  cnpj: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: true 
  },
  telefone: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  email_comercial: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  endereco: { 
    type: DataTypes.JSONB, 
    allowNull: true 
  },
  dashboard_prefs: { 
    type: DataTypes.JSONB, 
    allowNull: true 
  },
}, {
  tableName: "concessionarias",
  timestamps: true,
});
export default Concessionaria;

