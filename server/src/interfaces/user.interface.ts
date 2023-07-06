import { Document, ObjectId } from "mongoose";

type UserRole = "admin" | "user";

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  selectedStudyPlan: ObjectId;
  maximumStudyPlans: number;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
