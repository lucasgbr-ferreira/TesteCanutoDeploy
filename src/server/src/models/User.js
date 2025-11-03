import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("client","concessionaria","admin"), allowNull:false, defaultValue: "client" },

   // Avatar stored in DB (BYTEA)
  avatarData: { type: DataTypes.BLOB("long"), allowNull: true }, // stores binary
  avatarMime: { type: DataTypes.STRING, allowNull: true },
  avatarSize: { type: DataTypes.INTEGER, allowNull: true }, // bytes
}, {
  tableName: "users",
  timestamps: true,
});

export default User;
