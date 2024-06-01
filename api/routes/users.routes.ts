import express from "express";
import {
  controlLogout,
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

router.post("/logout", controlLogout);

router.get("/me", authMiddleware, getMe);

router.get("/all", getAllUsers);
export default router;
