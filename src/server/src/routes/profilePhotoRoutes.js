import express from "express";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadProfilePhoto, getProfilePhoto } from "../controllers/profilePhotoController.js";

const router = express.Router();
const upload = multer();

router.post("/upload", authMiddleware, upload.single("foto"), uploadProfilePhoto);
router.get("/:id", getProfilePhoto);

export default router;
