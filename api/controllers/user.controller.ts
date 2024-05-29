import { Request, Response } from "express";
import {
  comparePasswords,
  createUser,
  getUserByEmail,
} from "../services/user.services";
import { getUsers } from "../services/user.services";
import { generateToken } from "../utils/token.utils";
import { IUser } from "../models/users.models";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const existingUser = await getUserByEmail(req.body.email);
    if (existingUser) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    const newUser = (await createUser(req.body)) as IUser;
    const token = generateToken(newUser);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await comparePasswords(
      password,
      (user as IUser).password
    );
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken(user as IUser);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
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
