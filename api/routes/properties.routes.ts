import express from "express";
import {
  eraseAllProperties,
  getAll,
  getOnePropertieBy,
  newPropertie,
  removePropertie,
} from "../controllers/propertie.controllers";
import { authMiddlewareAdmin } from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/all", getAll);

router.get("/single-by-id/:id", getOnePropertieBy);

router.post("/new-house", authMiddlewareAdmin, newPropertie);

router.delete("/remove/:id", authMiddlewareAdmin, removePropertie);

router.delete("/erase-all", authMiddlewareAdmin, eraseAllProperties);

export default router;
