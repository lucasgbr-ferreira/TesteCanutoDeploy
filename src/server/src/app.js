import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import User from "./models/User.js"; 

dotenv.config({ path: "./server/.env" });

const app = express();
app.use(cors());
app.use(express.json());

// rotas
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("GesCar API running"));

// start
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection ok");
    // atualiza o schema (dev only).
    await sequelize.sync({ alter: true });
    console.log("✅ Models synced");
    app.listen(PORT, () => console.log(`🚀 Server listening on ${PORT}`));
  } catch (err) {
    console.error("❌ Unable to start server:", err);
    process.exit(1);
  }
};

start();
