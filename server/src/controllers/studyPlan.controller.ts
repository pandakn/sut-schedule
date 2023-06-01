import { Request, Response } from "express";
import StudyPlan from "../models/studyPlan";

export const getStudyPlan = async (req: Request, res: Response) => {
  try {
    const studyPlan = await StudyPlan.find();
    if (!studyPlan) {
      res.status(404).json({ message: "Study plan not found" });
      return;
    }

    res.status(200).json({
      countStudyPlan: studyPlan.length,
      result: studyPlan,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to deleted study plan", error });
  }
};

export const getStudyPlanByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const studyPlan = await StudyPlan.findById({ _id: id });

    if (!studyPlan) {
      res.status(404).json({ message: "Study plan not found" });
      return;
    }

    res.status(200).json({
      result: studyPlan,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to deleted study plan", error });
  }
};

export const deleteStudyPlan = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const studyPlan = await StudyPlan.findByIdAndDelete(id);
    if (!studyPlan) {
      res.status(404).json({ message: "Study plan not found" });
      return;
    }

    res.status(200).json({
      message: "deleted study plan successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to deleted study plan", error });
  }
};
