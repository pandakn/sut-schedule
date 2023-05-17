import express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { getCourseData } from "../controllers/course.controller";

export default (router: express.Router) => {
  // router.get("/courses", authenticateToken, getCourseData);
  router.get("/courses", getCourseData);
};
