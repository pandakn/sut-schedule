import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user";
import { IUser } from "interfaces/user.interface";

import { createDefaultStudyPlan } from "../utils/defaultStudyPlan";
import { generateOTP, sendOTPToEmail } from "../utils/sendEmail";

export interface UserPayload {
  id: string;
  name: string;
  username: string;
  role: string;
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

    if (username.length < 4) {
      res
        .status(400)
        .json({ message: "Username must have at least 4 characters" });
      return;
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must have at least 6 characters" });
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

    const defaultStudyPlan = await createDefaultStudyPlan(newUser._id);
    newUser.selectedStudyPlan = defaultStudyPlan._id;

    await newUser.save();
    res
      .status(200)
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
      role: user.role,
    };

    const accessToken = jwt.sign(accessPayload, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    const refreshPayload: UserPayload = {
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
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
        expiresIn: "15m",
      }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: true, // Enable this if using HTTPS
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;

    // Check if user exists
    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP and set its expiration time (e.g., 3 minutes from now)
    const otp = generateOTP();
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 3);

    // // Save OTP and its expiration in the user object
    // user.otp = otp;
    // user.otpExpiration = otpExpiration;
    // await user.save();

    // Store OTP and its expiration in req.app.locals
    req.app.locals.OTP = otp;
    req.app.locals.OTPExp = otpExpiration;

    // Send OTP to user's email
    const resEmail = await sendOTPToEmail(email, otp);
    const sendTo = resEmail.accepted[0];

    if (!resEmail) return;

    res.status(200).json({ message: "OTP sent to email", result: { sendTo } });
  } catch (err) {
    console.error("Error in forgotPassword:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { username, otp } = req.body;

    const storedOTP = req.app.locals.OTP;
    const otpExpiration = req.app.locals.OTPExp;

    // Check if user exists
    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP exists and has not expired
    if (!storedOTP || !otpExpiration || otpExpiration < new Date()) {
      return res.status(400).json({ message: "OTP is invalid or expired" });
    }

    // Check if the provided OTP matches the one in the database
    if (storedOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // If OTP is valid, you can clear the OTP and its expiration from req.app.locals
    req.app.locals.OTP = undefined;
    req.app.locals.OTPExp = undefined;

    const resetSession = new Date();
    resetSession.setMinutes(otpExpiration.getMinutes() + 5);
    req.app.locals.resetSession = true;
    req.app.locals.resetSessionExp = resetSession;

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("Error in verifyOTP:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { username, newPassword } = req.body;
    const storedResetSession = req.app.locals.resetSession;
    const resetSessionExp = req.app.locals.resetSessionExp;

    // Find the user based on the provided username
    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      !storedResetSession ||
      !resetSessionExp ||
      resetSessionExp < new Date()
    ) {
      return res.status(404).json({ message: "Session expired!" });
    }

    if (newPassword.length < 6) {
      res
        .status(400)
        .json({ message: "Password must have at least 6 characters" });
      return;
    }

    // Update the user's password with the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Error in resetPassword:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
