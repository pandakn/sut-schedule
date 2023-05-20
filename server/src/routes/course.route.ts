import express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { getCourseData, addCourse } from "../controllers/course.controller";

export default (router: express.Router) => {
  router.get("/courses", getCourseData);
  // router.get("/courses", getCourseData);
  router.post("/courses", authenticateToken, addCourse);
};
