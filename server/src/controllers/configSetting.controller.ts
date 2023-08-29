import { Request, Response } from "express";
import fs from "fs";
import ConfigSettings, { IConfigSettings } from "../models/configSetting";

export const createConfigSetting = async (req: Request, res: Response) => {
  try {
    const { href, footerText } = req.body;

    let logo = "";

    if (req.file) {
      logo = req.file.filename;
    }

    // Try to find the existing configLogo document
    let configSettings: IConfigSettings | null = await ConfigSettings.findOne();

    if (!configSettings) {
      // If no document exists, create a new one
      configSettings = new ConfigSettings({
        href,
        logo,
        footerText,
      });
    } else {
      // If a document exists, update its fields
      const imagePath = `public/images/${configSettings.logo}`;
      fs.unlinkSync(imagePath);
      configSettings.href = href;
      configSettings.logo = logo;
      configSettings.footerText = footerText;
    }

    const savedConfigLogo: IConfigSettings = await configSettings.save();

    res.status(200).json({ result: savedConfigLogo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getConfigSetting = async (req: Request, res: Response) => {
  try {
    const configSetting = await ConfigSettings.findOne();
    if (!configSetting) {
      res.status(404).json({ message: "Config not found" });
      return;
    }

    res.status(200).json({
      result: configSetting,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
