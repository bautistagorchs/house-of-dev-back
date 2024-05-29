import jwt from "jsonwebtoken";
import { IUser } from "../models/users.models";

export const generateToken = (user: IUser) => {
  return jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.is_admin },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );
};
