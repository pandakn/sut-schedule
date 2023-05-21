import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user";
import { IUser } from "interfaces/user.interface";

interface UserPayload {
  id: string;
  name: string;
  username: string;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser: IUser | null = await User.findOne({
      $or: [{ name }, { username }],
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser: IUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "Registered successfully ", result: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "Invalid Username or Password" });
      return;
    }

    // Check if password is correct
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid Username or Password" });
      return;
    }

    const accessPayload: UserPayload = {
      id: user._id,
      name: user.name,
      username: user.username,
    };

    const accessToken = jwt.sign(accessPayload, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    const refreshPayload: UserPayload = {
      id: user._id,
      name: user.name,
      username: user.username,
    };

    const refreshToken = jwt.sign(
      refreshPayload,
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    // Set the refresh token as an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      secure: true, // Enable this if using HTTPS
      sameSite: "none",
    });

    res.status(200).json({
      message: "Logged in successfully",
      result: {
        accessToken,
        accessPayload,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const jwtRefreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ message: "Refresh token not found" });
    return;
  }

  try {
    const decoded: UserPayload | null = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as UserPayload;

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id, username: decoded.username },
      process.env.JWT_SECRET!,
      {
        expiresIn: "15",
      }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};
