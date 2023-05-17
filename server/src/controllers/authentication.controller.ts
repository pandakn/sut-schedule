import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user";
import { IUser } from "interfaces/user.interface";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser: IUser | null = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser: IUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ result: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Check if password is correct
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(400).json({ message: "Password Invalid!" });
      return;
    }

    const payload = {
      user: {
        id: user._id,
        username: user.username,
      },
    };

    // Create and sign a token
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "3h",
    });

    res.status(200).json({ message: "Logged in successfully", token, payload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
