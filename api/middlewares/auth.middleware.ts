import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.utils";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { myToken } = req.cookies;
  if (!myToken) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    const decoded = verifyToken(myToken);
    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o no autorizado." });
  }
};

export const checkExistanceOfEmailAndPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  return next();
};
