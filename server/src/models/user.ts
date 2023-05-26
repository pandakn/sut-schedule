import mongoose, { Schema } from "mongoose";
import { IUser } from "interfaces/user.interface";

export interface IUserModel extends IUser {}

const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
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
    courses: {
      type: Array,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUserModel>("User", userSchema);

export default User;
