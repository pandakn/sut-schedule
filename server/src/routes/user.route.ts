import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  editUser,
  addSubjectToStudyPlan,
  getStudyPlansOfUser,
  deleteCourseOfUser,
  selectStudyPlan,
  createStudyPlan,
  deleteStudyPlan,
} from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";

export default (router: express.Router) => {
  router.get("/users", authenticateToken, getAllUsers);
  router.get("/users/:id", authenticateToken, getUserById);
  router.delete("/users/:id", authenticateToken, deleteUserById);
  router.put("/users/:id", authenticateToken, editUser);

  // course
  router.get("/users/:id/study-plans", authenticateToken, getStudyPlansOfUser);
  // add course
  router.post(
    "/users/:userID/study-plans/:studyPlanID",
    authenticateToken,
    addSubjectToStudyPlan
  );

  router.delete(
    "/users/:userID/study-plans/:studyPlanID/courses/:courseID",
    authenticateToken,
    deleteCourseOfUser
  );

  // study plan
  // create study plan
  router.post("/users/:id/study-plans", createStudyPlan);
  router.post("/users/:userId/study-plan/:studyPlanId", selectStudyPlan);
  router.delete("/users/:userId/study-plan/:studyPlanId", deleteStudyPlan);
};
