// app.js
import 'dotenv/config'; 
import express from 'express';  
import cors from 'cors';
import sequelize from './config/database.js';
import './models/index.js'; 

import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import imageGetRoutes from './routes/imageGetRoutes.js'; 
import concessionariaRoutes from './routes/concessionariaRoutes.js'; 
import clientRoutes from './routes/clientRoutes.js';
import veiculoRoutes from './routes/veiculoRoutes.js'; 
import profilePhotoRoutes from './routes/profilePhotoRoutes.js';
import veiculoPhotoRoutes from './routes/veiculoPhotoRoutes.js'; 

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
app.use('/api/veiculo-photos', veiculoPhotoRoutes);

app.get('/', (req, res) => res.send('GesCar API running'));

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connection ok');
    
    // Sincronizar modelos sem forçar a recriação das tabelas
    await sequelize.sync();
    console.log('✅ Models synced safely - existing data preserved');
    
    console.log('✅ Setup inicial concluído');

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Unable to start server:', err);
    process.exit(1);
  }
};
start();