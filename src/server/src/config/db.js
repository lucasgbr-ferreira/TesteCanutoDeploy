const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
    },
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('📦 Conectado ao banco de dados com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao conectar ao banco:', err);
  }
}

testConnection();

module.exports = sequelize;
