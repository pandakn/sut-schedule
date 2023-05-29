import { CourseDataInterface } from "../models/course.interface";

export const setDataToLocalStorage = (
  planID?: string,
  studyPlanName?: string,
  courseSchedule?: CourseDataInterface[]
) => {
  // Update localStorage only when a new plan is selected
  localStorage.setItem("studyPlan", JSON.stringify(courseSchedule));
  localStorage.setItem(
    "selectedPlan",
    JSON.stringify({ id: planID, name: studyPlanName })
  );
};
