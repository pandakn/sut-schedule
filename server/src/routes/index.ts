import express, { Router } from "express";

// routes
import authentication from "./authentication.route";
import users from "./user.route";
import courses from "./course.route";
import studyPlan from "./studyPlan.route";
import blogRoute from "./blog.route";

const router = Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  courses(router);
  studyPlan(router);
  blogRoute(router);

  return router;
};
