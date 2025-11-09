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


import profilePhotoRoutes from "./routes/profilePhotoRoutes.js";



const app = express();
app.use(cors());
app.use(express.json({ limit: '6mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/media', imageGetRoutes); 
app.use('/api/concessionarias', concessionariaRoutes); 

app.use("/api/profile/photo", profilePhotoRoutes);



app.use('/api/uploads', uploadRoutes); 
app.use('/api/clients', clientRoutes); 

app.use('/api/veiculos', veiculoRoutes);

app.get('/', (req, res) => res.send('GesCar API running'));

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connection ok');
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('✅ Models synced (sync alter enabled)');
    } else {
      console.log('ℹ️ Production mode: skipping sequelize.sync, use migrations');
    }

    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Unable to start server:', err);
    process.exit(1);
  }
};
start();


