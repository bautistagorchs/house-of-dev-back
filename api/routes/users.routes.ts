import express from "express";
import {
  getAllUsers,
  getMe,
  loginUser,
  registerUser,
} from "../controllers/user.controller";
import {
  authMiddleware,
  checkExistanceOfEmailAndPassword,
} from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", checkExistanceOfEmailAndPassword, loginUser);

router.get("/all", getAllUsers);

router.get("/me", authMiddleware, getMe);

export default router;
