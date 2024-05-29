import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/user.controller";
import { validateLogin } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", validateLogin, loginUser);

router.get("/all", getAllUsers);

export default router;
