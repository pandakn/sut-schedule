import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  creator: string;
  title: string;
  body: string;
  tags: string[];
}

const blogSchema: Schema = new mongoose.Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
});

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
