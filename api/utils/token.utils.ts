import jwt, { TokenExpiredError } from "jsonwebtoken";
import { IUser } from "../models/users.models";

const secretKey = process.env.JWT_SECRET;

export const generateToken = (user: IUser) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    last_name: user.last_name,
    phone_number: user.phone_number,
    is_confirmed: user.is_confirmed,
    is_admin: user.is_admin,
  };
  return jwt.sign(payload, secretKey!, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  if (!secretKey) throw new Error("Llave secreta no encontrada");

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    if (error instanceof TokenExpiredError)
      throw new Error("El token ha expirado");
    else throw new Error("Token invalido");
  }
};
