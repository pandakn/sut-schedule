import express, { Router } from "express";

// routes
import authentication from "./authentication.route";
import users from "./user.route";
import courses from "./course.route";
import studyPlan from "./studyPlan.route";
import blog from "./blog.route";
import comment from "./comment.route";
import configLogo from "./configLogo.route";
import tag from "./tag.route";

const router = Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  courses(router);
  studyPlan(router);
  blog(router);
  comment(router);
  configLogo(router);
  tag(router);

  return router;
};
