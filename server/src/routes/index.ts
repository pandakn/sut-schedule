import express, { Router } from "express";

// routes
import authentication from "./authentication.route";
import users from "./user.route";
import courses from "./course.route";

const router = Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  courses(router);

  return router;
};
