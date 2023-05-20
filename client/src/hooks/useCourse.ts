import { useContext } from "react";
import { CourseContextType, CourseContext } from "../contexts/CourseContext";

export const useCourse = (): CourseContextType => useContext(CourseContext);
