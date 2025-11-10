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
import profilePhotoRoutes from "./routes/profilePhotoRoutes.js";


const app = express();
// CORS configurado para aceitar o front dev (Vite) e outras origens úteis em dev
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN || 'http://localhost:5173', // Vite
  'http://localhost:3000' // caso front também rode aqui em algum teste
];

// função de verificação
app.use(cors({
  origin: function(origin, callback) {
    // permitir requests sem origin (curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy: origin ${origin} not allowed`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// opcional: tratar erro de CORS para mostrar mensagem no console do browser
app.use(function (err, req, res, next) {
  if (err && err.message && err.message.indexOf('CORS') !== -1) {
    console.warn('CORS blocked request:', err.message);
    return res.status(403).json({ message: 'CORS blocked: origin not allowed' });
  }
  next(err);
});
app.use(express.json({ limit: '6mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/media', imageGetRoutes); 
app.use('/api/concessionarias', concessionariaRoutes); 
app.use("/api/profile/photo", profilePhotoRoutes);



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