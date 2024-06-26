import { Request, Response } from "express";
import {
  checkFieldsCompletion,
  comparePasswords,
  createUser,
  getUserByEmail,
} from "../services/user.services";
import { getUsers } from "../services/user.services";
import { generateToken } from "../utils/token.utils";
import { IUser } from "../models/users.models";

export const registerUser = async (req: Request, res: Response) => {
  /*const { name, last_name, phone_number, email, password, confirm_password } =
    req.body;
  if (
    !name ||
    !last_name ||
    !phone_number ||
    !email ||
    !password ||
    !confirm_password
  )
    return res
      .status(400)
      .json({ message: "Por favor complete todos los campos" });
  if (password !== confirm_password)
    return res.status(400).json("Las contraseñas no coinciden");*/

  try {
    checkFieldsCompletion(req.body);
    const existingUser = await getUserByEmail(req.body.email);
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const newUser = (await createUser(req.body)) as IUser;
    const token = generateToken(newUser);

    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    if (error instanceof Error) return res.status(500).send(error.message);
    else return new Error("An unknown error occurred");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });
    const passwordIsValid = await comparePasswords(
      password,
      (user as IUser).password
    );
    if (!passwordIsValid)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user as IUser);
    return res
      .status(200)
      .cookie("myToken", token, {
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error });
  }
};

export const controlLogout = async (req: Request, res: Response) => {
  const { myToken } = req.cookies;

  if (!myToken) return res.sendStatus(204);

  try {
    res.clearCookie("myToken");
    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getMe = (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  return res.status(200).json({ user });
};

export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};
