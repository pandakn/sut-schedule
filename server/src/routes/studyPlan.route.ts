import express from "express";
import {
  createStudyPlan,
  deleteStudyPlan,
  getStudyPlan,
} from "../controllers/studyPlan.controller";
import { authenticateToken } from "../middleware/auth.middleware";

export default (router: express.Router) => {
  router.post("/study-plan", authenticateToken, createStudyPlan);
  router.get("/study-plans", authenticateToken, getStudyPlan);
  router.delete("/study-plan/:id", authenticateToken, deleteStudyPlan);
};
