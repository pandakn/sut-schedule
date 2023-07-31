import express from "express";
import {
  createTag,
  getAllTags,
  getPopularTags,
} from "../controllers/tag.controller";
import { authenticateToken } from "../middleware/auth.middleware";

export default (router: express.Router) => {
  router.get("/tags", getAllTags);
  router.get("/tags/popular", getPopularTags);
  router.post("/tags", authenticateToken, createTag);
};
