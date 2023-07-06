import mongoose, { Schema } from "mongoose";
import { IUser } from "interfaces/user.interface";

export interface IUserModel extends IUser {}

const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    selectedStudyPlan: {
      type: Schema.Types.ObjectId,
      ref: "StudyPlan",
    },
    maximumStudyPlans: {
      type: Number,
      default: 3,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUserModel>("User", userSchema);

export default User;
