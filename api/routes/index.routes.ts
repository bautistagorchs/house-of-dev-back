import express from "express";
import properties from "./properties.routes";
import users from "./users.routes";
const router = express.Router();

router.use("/properties", properties);
router.use("/users", users);

export default router;
