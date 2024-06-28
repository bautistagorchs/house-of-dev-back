import User from "../models/users.models";
import { userDataType } from "../types/types";
import bcrypt from "bcrypt";

export const checkFieldsCompletion = (user: userDataType) => {
  const { name, last_name, phone_number, email, password, confirm_password } =
    user;
  if (
    !name ||
    !last_name ||
    !phone_number ||
    !email ||
    !password ||
    !confirm_password
  )
    throw new Error("Por favor complete todos los campos");
  if (password !== confirm_password)
    throw new Error("Las contraseñas no coinciden");
  else return;
};

export const createUser = async (userData: userDataType) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw new Error("Error creating user");
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error("Error fetching user");
  }
};

export const comparePasswords = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Error retrieving users from database");
  }
};
