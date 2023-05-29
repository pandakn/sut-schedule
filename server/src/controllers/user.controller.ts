import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUserModel } from "../models/user";
import StudyPlan, { IStudyPlanModel } from "../models/studyPlan";
import mongoose from "mongoose";

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ result: users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await User.findById({ _id: id }).exec();
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ result: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// edit a user by ID
export const editUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const { username, password } = req.body;

  try {
    const user: IUserModel | null = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.username = username || user.username;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    await user.save();

    res
      .status(200)
      .json({ message: "User updated successfully", result: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user by ID
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User deleted successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addSubjectToStudyPlan = async (req: Request, res: Response) => {
  const { studyPlanID, courseSchedule } = req.body;
  const { id } = req.params;

  try {
    // Find the user by ID
    const user: IUserModel | null = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Find the study plan by ID
    const studyPlan: IStudyPlanModel | null = await StudyPlan.findById(
      studyPlanID
    );
    if (!studyPlan) {
      res.status(404).json({ message: "Study plan not found" });
      return;
    }

    // Add the class schedule to the existing study plan
    studyPlan.courseSchedule.push(courseSchedule);

    // Save the updated study plan
    await studyPlan.save();

    res.status(200).json({
      message: "Subjects added to the study plan successfully",
      studyPlan,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add subjects to the study plan", error });
  }
};

export const getStudyPlansOfUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate the id parameter
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid id parameter" });
    return;
  }

  const idObj = new mongoose.Types.ObjectId(id);

  try {
    const studyPlans: IUserModel[] | null = await StudyPlan.find({
      creator: idObj,
    }).populate("creator");
    if (!studyPlans) {
      res.status(404).json({ message: "Study plan not found" });
      return;
    }

    res
      .status(200)
      .json({ countStudyPlan: studyPlans.length, result: studyPlans });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve study plans", error });
  }
};

export const deleteCourseOfUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { studyPlanID, courseID } = req.body;

  try {
    // Find the study plan by ID
    const studyPlan: IStudyPlanModel | null = await StudyPlan.findOneAndUpdate(
      { _id: studyPlanID, creator: id },
      { $pull: { courseSchedule: { id: courseID } } },
      { new: true }
    );

    if (!studyPlan) {
      res.status(404).json({ message: "Study plan or course not found" });
      return;
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
