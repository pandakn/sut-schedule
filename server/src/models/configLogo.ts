import mongoose, { Schema, Document } from "mongoose";

export interface IConfigLogo extends Document {
  href: string;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
}

const configLogoSchema: Schema = new mongoose.Schema(
  {
    href: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ConfigLogo = mongoose.model<IConfigLogo>("ConfigLogo", configLogoSchema);

export default ConfigLogo;
