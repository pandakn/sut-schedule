import { Document } from "mongoose";
import { ICourse } from "./course.interface";

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  courses: ICourse[];
  createdAt: Date;
  updatedAt: Date;
}
