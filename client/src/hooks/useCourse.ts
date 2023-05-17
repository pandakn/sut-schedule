import { useContext } from "react";
import { CourseContextValue, CourseContext } from "../contexts/CourseContext";

export const useCourse = (): CourseContextValue => useContext(CourseContext);
