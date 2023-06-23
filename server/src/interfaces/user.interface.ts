import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  selectedStudyPlan: ObjectId;
  maximumStudyPlans: number;
  createdAt: Date;
  updatedAt: Date;
}
