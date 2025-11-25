import { Router } from "express";
import { uploadVeiculoPhoto, getVeiculoPhoto } from "../controllers/veiculoPhotoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = Router();

// Todas as rotas exigem autenticação
router.use(authMiddleware);

// Upload de foto para um veículo
router.post("/:veiculoId/photo", upload.single("photo"), uploadVeiculoPhoto);

// Obter foto de um veículo
router.get("/:veiculoId/photo", getVeiculoPhoto);

export default router;