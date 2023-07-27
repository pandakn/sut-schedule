import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IComment extends Document {
  author: ObjectId;
  blog: ObjectId;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema: Schema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      require: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
