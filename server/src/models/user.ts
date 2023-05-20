import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "interfaces/user.interface";

export interface IUserModel extends IUser {}

const userSchema: Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    courses: [],
  },
  { timestamps: true }
);

const User = mongoose.model<IUserModel>("User", userSchema);

export default User;
