import { Request, Response } from "express";
import fs from "fs";
import ConfigLogo, { IConfigLogo } from "../models/configLogo";

export const createConfigLogo = async (req: Request, res: Response) => {
  try {
    let { href, logo } = req.body;

    if (req.file) {
      logo = req.file.filename;
    }

    // Try to find the existing configLogo document
    let configLogo: IConfigLogo | null = await ConfigLogo.findOne();

    if (!configLogo) {
      // If no document exists, create a new one
      configLogo = new ConfigLogo({
        href,
        logo,
      });
    } else {
      // If a document exists, update its fields
      const imagePath = `public/images/${configLogo.logo}`;
      fs.unlinkSync(imagePath);
      configLogo.href = href;
      configLogo.logo = logo;
    }

    const savedConfigLogo: IConfigLogo = await configLogo.save();

    res.status(200).json({ result: savedConfigLogo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getConfigLogo = async (req: Request, res: Response) => {
  try {
    const configLogo = await ConfigLogo.findOne();
    if (!configLogo) {
      res.status(404).json({ message: "Logo not found" });
      return;
    }

    res.status(200).json({
      result: configLogo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
