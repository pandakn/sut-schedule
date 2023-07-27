import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IComment } from "./comment";

export interface IBlog extends Document {
  author: ObjectId;
  cover: string;
  title: string;
  body: string;
  tags: string[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema: Schema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cover: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
