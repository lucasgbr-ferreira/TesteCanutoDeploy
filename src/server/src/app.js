import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import imageGetRoutes from "./routes/imageGetRoutes.js";
import User from "./models/User.js"; // garante o carregamento do model

// Carrega .env a partir do diretório de execução
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// rotas
app.use("/api/auth", authRoutes);

// rotas de upload / media (avatars)
app.use("/api/uploads", uploadRoutes);
app.use("/api/media", imageGetRoutes);

// rota raiz
app.get("/", (req, res) => res.send("GesCar API running"));

// start
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection ok");
    // atualiza o schema (dev only). Em produção, use migrations.
    await sequelize.sync({ alter: true });
    console.log("✅ Models synced");
    app.listen(PORT, () => console.log(`🚀 Server listening on ${PORT}`));
  } catch (err) {
    console.error("❌ Unable to start server:", err);
    process.exit(1);
  }
};

start();

