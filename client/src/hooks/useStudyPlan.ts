import { useContext } from "react";
import {
  StudyPlanContext,
  StudyPlanContextType,
} from "../contexts/StudyPlanContext";

export const useStudyPlan = (): StudyPlanContextType =>
  useContext(StudyPlanContext);
