import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
