import { Request, Response } from "express";
import User, { IUserModel } from "../models/user";
import { createDefaultStudyPlan } from "../utils/defaultStudyPlan";
import StudyPlan from "../models/studyPlan";

export const createStudyPlan = async (req: Request, res: Response) => {
  const { userID, name } = req.body;

  try {
    // Find the user by ID
    const user: IUserModel | null = await User.findById(userID);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const studyPlan = await createDefaultStudyPlan(userID, name);

    res.status(200).json({
      message: "added study plan successfully",
      result: studyPlan,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to added study plan", error });
  }
};

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
