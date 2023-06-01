import express from "express";
import {
  deleteStudyPlan,
  getStudyPlan,
  getStudyPlanByID,
} from "../controllers/studyPlan.controller";
import { authenticateToken } from "../middleware/auth.middleware";

export default (router: express.Router) => {
  router.get("/study-plans", authenticateToken, getStudyPlan);
  router.get("/study-plan/:id", authenticateToken, getStudyPlanByID);
  router.delete("/study-plan/:id", authenticateToken, deleteStudyPlan);
};
