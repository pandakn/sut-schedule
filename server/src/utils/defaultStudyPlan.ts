import StudyPlan, { IStudyPlanModel } from "../models/studyPlan";

export const createDefaultStudyPlan = async (
  id: string,
  name = "Default Study Plan"
): Promise<IStudyPlanModel> => {
  try {
    // Create a default study plan for the user
    const defaultStudyPlan: IStudyPlanModel = new StudyPlan({
      creator: id,
      name,
      courseSchedule: [],
      // Set other default study plan properties
    });

    // Save the default study plan
    await defaultStudyPlan.save();
    return defaultStudyPlan;
  } catch (error) {
    throw error;
  }
};
