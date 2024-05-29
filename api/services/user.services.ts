import User from "../models/users.models";
import { userDataType } from "../types/types";
import bcrypt from "bcrypt";

export const createUser = async (userData: userDataType) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
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
