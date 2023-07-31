import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ITag extends Document {
  name: string;
  blogs: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const tagSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  },
  { timestamps: true }
);

const Tag = mongoose.model<ITag>("Tag", tagSchema);

export default Tag;
