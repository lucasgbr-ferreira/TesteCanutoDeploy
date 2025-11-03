import { Router } from "express";
import User from "../models/User.js";

const router = Router();

// GET avatar binary (returns image directly)
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = await User.findByPk(userId, { attributes: ["avatarData", "avatarMime"] });
    if (!user || !user.avatarData) return res.status(404).json({ message: "Imagem não encontrada" });

    res.setHeader("Content-Type", user.avatarMime || "application/octet-stream");
    // avatarData is a Buffer-like (node will handle sending)
    return res.send(user.avatarData);
  } catch (err) {
    console.error("get avatar error:", err);
    return res.status(500).json({ message: "Erro ao buscar avatar" });
  }
});

export default router;
