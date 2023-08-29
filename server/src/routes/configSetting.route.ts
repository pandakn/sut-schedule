import express from "express";
import {
  createConfigSetting,
  getConfigSetting,
} from "../controllers/configSetting.controller";
import { authenticateToken, adminCheck } from "../middleware/auth.middleware";
import upload from "../middleware/upload";

export default (router: express.Router) => {
  router.get("/config-setting", getConfigSetting);
  router.post(
    "/config-setting",
    authenticateToken,
    adminCheck,
    upload.single("logo"),
    createConfigSetting
  );
};
