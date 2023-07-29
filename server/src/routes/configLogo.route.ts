import express from "express";
import {
  createConfigLogo,
  getConfigLogo,
} from "../controllers/configLogo.controller";
import { authenticateToken, adminCheck } from "../middleware/auth.middleware";
import upload from "../middleware/upload";

export default (router: express.Router) => {
  router.get("/config-logo", getConfigLogo);
  router.post(
    "/config-logo",
    authenticateToken,
    adminCheck,
    upload.single("logo"),
    createConfigLogo
  );
};
