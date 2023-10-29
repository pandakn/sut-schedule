import { Request, Response } from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User, { IUserModel } from "../models/user";
import StudyPlan, { IStudyPlanModel } from "../models/studyPlan";
import { createDefaultStudyPlan } from "../utils/defaultStudyPlan";
import { handleSameSchedule } from "../utils/handleSameSchedule";

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

    const user = await User.findById({ _id: id }).populate("selectedStudyPlan");
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
  const { name, username, password, role, maximumStudyPlans } = req.body;

  console.log(req.body);

  try {
    const user: IUserModel | null = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if the new username is already taken by another user
    const existingUser: IUserModel | null = await User.findOne({ username });
    if (existingUser && existingUser._id.toString() !== userId) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }

    user.username = username || user.username;
    user.name = name || user.name;
    user.role = role || user.role;
    user.maximumStudyPlans = maximumStudyPlans || user.maximumStudyPlans;

    if (username?.length < 4) {
      res
        .status(400)
        .json({ message: "Username must have at least 4 characters" });
      return;
    }

    if (password?.length < 6) {
      res
        .status(400)
        .json({ message: "Password must have at least 6 characters" });
      return;
    }

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
    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Delete the associated study plans (if any)
    await StudyPlan.deleteMany({ creator: user._id });

    // Delete the user
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User and associated study plans deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addCourseToStudyPlan = async (req: Request, res: Response) => {
  const { courseSchedule } = req.body; // Courses to be added
  const { userID, studyPlanID } = req.params;

  try {
    // Find the user by ID
    const user: IUserModel | null = await User.findById(userID);
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

    const courseInStudyPlan = studyPlan.courseSchedule;

    const conflictingCourses = courseInStudyPlan.filter((c) => {
      const checkCourseCode = c.courseCode === courseSchedule.courseCode;

      const sameSchedule = handleSameSchedule(
        courseSchedule.classSchedule,
        c.classSchedule
      );

      return sameSchedule || checkCourseCode;
    });

    if (conflictingCourses.length > 0) {
      const courseConflicts = conflictingCourses.map((c) => c.courseNameEN);

      const errorMsg = `The class schedule conflicts with\n${courseConflicts}`;

      res.status(404).json({ message: errorMsg });
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
  const { userID, studyPlanID, courseID } = req.params;

  try {
    // Find the study plan by ID
    const studyPlan: IStudyPlanModel | null = await StudyPlan.findOneAndUpdate(
      { _id: studyPlanID, creator: userID },
      { $pull: { courseSchedule: { id: courseID } } },
      { new: true }
    );

    if (!studyPlan) {
      res.status(404).json({ message: "Study plan or course not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Course deleted successfully", result: studyPlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const selectStudyPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, studyPlanId } = req.params;

  try {
    // Check if the user exists
    const user: IUserModel = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if the study plan exists
    const studyPlan = await StudyPlan.findById(studyPlanId);

    if (!studyPlan) {
      res.status(404).json({ message: "Study plan not found" });
      return;
    }

    // Update the user's selected study plan
    user.selectedStudyPlan = studyPlan._id;
    await user.save();

    res.status(200).json({
      message: "Selected study plan updated successfully",
      result: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const createStudyPlan = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    // Find the user by ID
    const user: IUserModel | null = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const maximumStudyPlans = user.maximumStudyPlans;

    // Check the number of existing study plans for the user
    const studyPlanCount = await StudyPlan.countDocuments({ creator: id });

    // If the user has three or more study plans, throw an error
    if (studyPlanCount >= maximumStudyPlans) {
      res
        .status(404)
        .json({ message: `maximum of ${maximumStudyPlans} study plans` });
      return;
    }

    const studyPlan = await createDefaultStudyPlan(id, name);

    res.status(200).json({
      message: "added study plan successfully",
      result: studyPlan,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to added study plan", error });
  }
};

export const deleteStudyPlan = async (req: Request, res: Response) => {
  const { userId, studyPlanId } = req.params;

  const userIDObj = new mongoose.Types.ObjectId(userId);

  try {
    const studyPlan = await StudyPlan.findByIdAndDelete(studyPlanId);
    if (!studyPlan) {
      res.status(404).json({ message: "Study plan not found" });
      return;
    }

    const studyPlans: IUserModel[] | null = await StudyPlan.find({
      creator: userIDObj,
    }).populate("creator");

    // console.log(studyPlans.length);
    if (studyPlans.length > 0) {
      const selectedStudyPlan = studyPlans[0]._id;
      await User.updateMany(
        { selectedStudyPlan: studyPlanId },
        { $set: { selectedStudyPlan } }
      );
    }

    res.status(200).json({
      message: "deleted study plan successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to deleted study plan", error });
  }
};
