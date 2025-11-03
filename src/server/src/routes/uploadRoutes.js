import { Router } from "express";
import multer from "multer";
import User from "../models/User.js";

const router = Router();

// memory storage (keeps file in memory as Buffer)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB max for avatar
  fileFilter: (req, file, cb) => {
    if (/^image\/(jpeg|png|jpg|webp)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error("Tipo de arquivo não suportado. Use jpeg/png/webp."), false);
  }
});

router.post("/users/:id/avatar", upload.single("avatar"), async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (!req.file) return res.status(400).json({ message: "Arquivo não enviado" });

    // validate user existence
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    // Save binary data in DB
    await user.update({
      avatarData: req.file.buffer,
      avatarMime: req.file.mimetype,
      avatarSize: req.file.size
    });

    return res.status(200).json({ message: "Avatar enviado com sucesso" });
  } catch (err) {
    console.error("upload avatar error:", err);
    if (err.code === "LIMIT_FILE_SIZE") return res.status(413).json({ message: "Arquivo muito grande (máx 2MB)" });
    return res.status(500).json({ message: "Erro no upload do avatar" });
  }
});

export default router;
