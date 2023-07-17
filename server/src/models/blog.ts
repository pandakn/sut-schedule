import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  author: string;
  cover: string;
  title: string;
  body: string;
  tags: string[];
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
  },
  { timestamps: true }
);

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
