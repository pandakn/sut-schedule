import mongoose, { Schema, Document } from "mongoose";

export interface IConfigSettings extends Document {
  href: string;
  logo: string;
  footerText: string;
  createdAt: Date;
  updatedAt: Date;
}

const configSettingsSchema: Schema = new mongoose.Schema(
  {
    href: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    footerText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ConfigSettings = mongoose.model<IConfigSettings>(
  "ConfigSettings",
  configSettingsSchema
);

export default ConfigSettings;
