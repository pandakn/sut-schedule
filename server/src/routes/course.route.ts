import express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  getCourseData,
  addCourse,
  deleteCourse,
} from "../controllers/course.controller";

export default (router: express.Router) => {
  router.get("/courses", authenticateToken, getCourseData);
  // router.get("/courses", getCourseData);
  router.post("/courses", authenticateToken, addCourse);
  router.delete("/course/:courseId", authenticateToken, deleteCourse);
};
