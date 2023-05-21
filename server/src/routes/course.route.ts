import express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  getCourseData,
  addCourse,
  deleteCourse,
  getCourseDataTest,
} from "../controllers/course.controller";

export default (router: express.Router) => {
  router.get("/courses", authenticateToken, getCourseData);
  router.get("/v2/courses", getCourseDataTest);
  router.post("/courses", authenticateToken, addCourse);
  router.delete("/course/:courseId", authenticateToken, deleteCourse);
};
