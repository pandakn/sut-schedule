import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

import { IUser } from "interfaces/user.interface";

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ result: users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await User.findById({ _id: id }).exec();
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ result: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// edit a user by ID
export const editUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const { username, password } = req.body;

  try {
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.username = username || user.username;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    await user.save();

    res
      .status(200)
      .json({ message: "User updated successfully", result: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user by ID
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User deleted successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
