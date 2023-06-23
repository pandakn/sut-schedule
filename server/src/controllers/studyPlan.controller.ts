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

export const updateStudyPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const studyPlan = await StudyPlan.findById({ _id: id });

    if (!studyPlan) {
      res.status(404).json({ message: "Study plan not found" });
      return;
    }

    studyPlan.name = name || studyPlan.name;

    studyPlan.save();

    res.status(200).json({
      message: "Study plan updated successfully",
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

export const reOrderOfCourseInStudyPlan = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { newSequence } = req.body;

    // Find the course schedule by its ID
    const courseSchedule = await StudyPlan.findById(id);

    if (!courseSchedule) {
      return res.status(404).json({ message: "Course schedule not found" });
    }

    // Update the course schedule's sequence with the new sequence
    courseSchedule.courseSchedule = newSequence;

    // Save the updated course schedule
    await courseSchedule.save();

    return res.status(200).json({ message: "Sequence updated successfully" });
  } catch (error) {
    console.error("Error updating sequence:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
