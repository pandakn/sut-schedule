import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  editUser,
  addCourseToStudyPlan,
  getStudyPlansOfUser,
  deleteCourseOfUser,
  selectStudyPlan,
  createStudyPlan,
  deleteStudyPlan,
} from "../controllers/user.controller";
import { createBlog, getBlogOfUser } from "../controllers/blog.controller";
import { adminCheck, authenticateToken } from "../middleware/auth.middleware";
import upload from "../middleware/upload";

export default (router: express.Router) => {
  router.get("/users", authenticateToken, adminCheck, getAllUsers);
  router.get("/users/:id", authenticateToken, getUserById);
  router.delete("/users/:id", authenticateToken, deleteUserById);
  router.put("/users/:id", authenticateToken, editUser);

  // course
  router.get("/users/:id/study-plans", authenticateToken, getStudyPlansOfUser);
  // add course
  router.post(
    "/users/:userID/study-plans/:studyPlanID",
    authenticateToken,
    addCourseToStudyPlan
  );

  router.delete(
    "/users/:userID/study-plans/:studyPlanID/courses/:courseID",
    authenticateToken,
    deleteCourseOfUser
  );

  // study plan
  // create study plan
  router.post("/users/:id/study-plans", authenticateToken, createStudyPlan);
  router.post(
    "/users/:userId/study-plan/:studyPlanId",
    authenticateToken,
    selectStudyPlan
  );
  router.delete(
    "/users/:userId/study-plan/:studyPlanId",
    authenticateToken,
    deleteStudyPlan
  );

  // blogs
  router.post(
    "/users/:userId/blogs",
    authenticateToken,
    upload.single("cover"),
    createBlog
  );

  router.get("/users/:userId/blogs", authenticateToken, getBlogOfUser);
};
