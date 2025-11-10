import 'dotenv/config'; 
import express from 'express';  
import cors from 'cors';
import sequelize from './config/database.js';
import './models/index.js'; 
import createCanutoConcessionaria from './seeders/createCanutoConcessionaria.js';

import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import imageGetRoutes from './routes/imageGetRoutes.js';
import concessionariaRoutes from './routes/concessionariaRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import veiculoRoutes from './routes/veiculoRoutes.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '6mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/media', imageGetRoutes); 
app.use('/api/concessionarias', concessionariaRoutes); 
app.use('/api/uploads', uploadRoutes); 
app.use('/api/clients', clientRoutes); 
app.use('/api/veiculos', veiculoRoutes);

// Rota para forçar a criação da concessionária (apenas desenvolvimento)
app.post('/api/dev/create-canuto', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ message: 'Não permitido em produção' });
  }
  
  try {
    await createCanutoConcessionaria();
    res.json({ message: 'Concessionária Canuto criada/verificada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => res.send('GesCar API running'));

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connection ok');
    
    // Sincronizar modelos
    await sequelize.sync({ alter: true });
    console.log('✅ Models synced');
    
    // Criar concessionária Canuto Motors
    console.log('🔄 Verificando/Criando concessionária Canuto Motors...');
    await createCanutoConcessionaria();
    console.log('✅ Setup inicial concluído');

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
      console.log('📋 Para testar a concessionária:');
      console.log('   📧 Email: canuto@canutomotors.com');
      console.log('   🔑 Senha: 12345');
      console.log('   🔗 Ou acesse: http://localhost:3000/api/dev/create-canuto para forçar a criação');
    });
  } catch (err) {
    console.error('❌ Unable to start server:', err);
    process.exit(1);
  }
};
start();