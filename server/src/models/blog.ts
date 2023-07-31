import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IComment } from "./comment";

export interface IBlog extends Document {
  author: ObjectId;
  cover: string;
  title: string;
  body: string;
  tags: ObjectId[];
  comments: IComment[];
  slug: string;
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
      unique: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
