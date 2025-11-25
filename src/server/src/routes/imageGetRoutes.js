import { Router } from "express";
import User from "../models/User.js";
import VeiculoPhoto from "../models/VeiculoPhoto.js";

const router = Router();

// GET avatar binary (returns image directly)
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = await User.findByPk(userId, { attributes: ["avatarData", "avatarMime"] });
    if (!user || !user.avatarData) return res.status(404).json({ message: "Imagem não encontrada" });

    res.setHeader("Content-Type", user.avatarMime || "application/octet-stream");
    return res.send(user.avatarData);
  } catch (err) {
    console.error("get avatar error:", err);
    return res.status(500).json({ message: "Erro ao buscar avatar" });
  }
});

// NOVA ROTA: GET veiculo photo binary
router.get("/veiculos/:veiculoId/photo", async (req, res) => {
  try {
    const veiculoId = Number(req.params.veiculoId);
    const photo = await VeiculoPhoto.findOne({
      where: { veiculo_id: veiculoId }
    });
    
    if (!photo) return res.status(404).json({ message: "Imagem do veículo não encontrada" });

    res.setHeader("Content-Type", photo.content_type || "application/octet-stream");
    return res.send(photo.data);
  } catch (err) {
    console.error("get veiculo photo error:", err);
    return res.status(500).json({ message: "Erro ao buscar foto do veículo" });
  }
});

export default router;