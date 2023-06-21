import express from "express";
import {
  deleteStudyPlan,
  getStudyPlan,
  getStudyPlanByID,
  updateStudyPlan,
} from "../controllers/studyPlan.controller";
import { authenticateToken } from "../middleware/auth.middleware";

export default (router: express.Router) => {
  router.get("/study-plans", authenticateToken, getStudyPlan);
  router.get("/study-plan/:id", authenticateToken, getStudyPlanByID);
  router.put("/study-plan/:id", authenticateToken, updateStudyPlan);
  router.delete("/study-plan/:id", authenticateToken, deleteStudyPlan);
};
