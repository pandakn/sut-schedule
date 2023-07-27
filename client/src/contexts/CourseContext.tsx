import React, { createContext, useState } from "react";
import {
  CourseInterface,
  CourseDataInterface,
  CourseSearchParamsInterface,
} from "../models/course.interface";
import {
  deleteCourseFromStudyPlan,
  getCoursesData,
} from "../services/httpClient";
import { useAuth, useStudyPlan } from "../hooks";
import toast from "react-hot-toast";

interface CourseContextType {
  courses: CourseInterface;
  loading: boolean;
  error: string | null;
  addCourseError: {
    isError: boolean;
    message: string;
  };
  fetchCourses: (params: CourseSearchParamsInterface) => Promise<void>;
  addCourseToSchedule: (
    studyPlanID: string,
    course: CourseDataInterface
  ) => void;
  removeCourse: (id: string) => void;
  showAlert: boolean;
}

const CourseContext = createContext<CourseContextType>({
  courses: { year: "", courseData: [] },
  loading: false,
  error: null,
  addCourseError: {
    isError: false,
    message: "",
  },
  fetchCourses: async () => {
    throw new Error("fetchCourses is not implemented");
  },
  addCourseToSchedule: () => {
    throw new Error("addCourseToSchedule is not implemented");
  },
  removeCourse: () => {
    throw new Error("removeCourse is not implemented");
  },
  showAlert: false,
});

interface CourseProviderProps {
  children: React.ReactNode;
}

const CourseProvider = ({ children }: CourseProviderProps) => {
  const { payload, accessToken } = useAuth();
  const { setCourseInPlanner, handleAddCourseToStudyPlan, selectedPlan } =
    useStudyPlan();

  const [courses, setCourses] = useState<CourseInterface>({
    year: "",
    courseData: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [addCourseError, setAddCourseError] = useState({
    isError: false,
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const fetchCourses = async (
    params: CourseSearchParamsInterface
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const res = await getCoursesData(
        params.acadyear,
        params.semester,
        params.coursecode,
        params.coursename,
        params.cmd,
        params.weekdays,
        params.timefrom,
        params.timeto
      );

      if (res?.status) {
        setCourses({ year: res.data.year, courseData: res.data.courseData });
      } else {
        setError(res?.data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  // studyPlanID: string,
  // courseSchedule: CourseDataInterface
  const addCourseToSchedule = async (
    studyPlanID: string,
    course: CourseDataInterface
  ) => {
    const errorMsg = await handleAddCourseToStudyPlan(studyPlanID, course);

    if (errorMsg) {
      setShowAlert(true);
      setAddCourseError({ isError: true, message: errorMsg });
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      toast.success("Course added successfully");
    }

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500);
  };

  const removeCourse = async (courseId: string) => {
    // Remove the course from the class schedule state
    setCourseInPlanner((prevSchedule) =>
      prevSchedule.filter((course) => course.id !== courseId)
    );

    await deleteCourseFromStudyPlan(
      payload.id,
      selectedPlan.id,
      courseId,
      accessToken
    );

    toast.success("Course deleted successfully");
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        error,
        addCourseError,
        fetchCourses,
        removeCourse,
        addCourseToSchedule,
        showAlert,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export { CourseProvider, CourseContext };
export type { CourseContextType };
