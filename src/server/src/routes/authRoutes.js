import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import { updateUserData } from '../controllers/authUpdateController.js';

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put('/update', authMiddleware, updateUserData);

export default router;
