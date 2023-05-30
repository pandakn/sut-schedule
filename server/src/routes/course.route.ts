import express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  getCourseDataFromREG,
  // addCourse,
  // deleteCourse,
  getCourseDataTest,
} from "../controllers/course.controller";

export default (router: express.Router) => {
  router.get("/courses", authenticateToken, getCourseDataFromREG);
  router.get("/v2/courses", getCourseDataTest);
};
