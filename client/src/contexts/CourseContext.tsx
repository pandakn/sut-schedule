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
import { handleSameSchedule } from "../utils/handleSameSchedule";

interface CourseContextType {
  courses: CourseInterface;
  loading: boolean;
  error: string | null;
  addCourseError: boolean;
  fetchCourses: (params: CourseSearchParamsInterface) => Promise<void>;
  // classSchedule: CourseDataInterface[];
  // setClassSchedule: React.Dispatch<React.SetStateAction<CourseDataInterface[]>>;
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
  addCourseError: false,
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
  const {
    courseInPlanner,
    setCourseInPlanner,
    handleAddCourseToStudyPlan,
    selectedPlan,
  } = useStudyPlan();

  const [courses, setCourses] = useState<CourseInterface>({
    year: "",
    courseData: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [addCourseError, setAddCourseError] = useState(false);
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
        params.coursename
      );

      if (res?.status) {
        setCourses({ year: res.data.year, courseData: res.data.courseData });
      } else {
        setError(res?.data);
      }
      setLoading(false);
    } catch (err) {
      // setError((err as Error).message);
      // setError({ status: false, message: (err as Error).message });
      setLoading(false);
    }
  };

  // studyPlanID: string,
  // courseSchedule: CourseDataInterface
  const addCourseToSchedule = async (
    studyPlanID: string,
    course: CourseDataInterface
  ) => {
    setAddCourseError(false);

    const isSameSchedule: boolean = courseInPlanner.some((c) => {
      const checkCourseCode = c.courseCode === course.courseCode;
      const sameSchedule = handleSameSchedule(
        course.classSchedule,
        c.classSchedule
      );

      return checkCourseCode || sameSchedule ? true : false;
    });

    // console.log("isSameSchedule", isSameSchedule);

    if (isSameSchedule) {
      setShowAlert(true);
      setAddCourseError(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      handleAddCourseToStudyPlan(studyPlanID, course);
    }

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500);
  };

  const removeCourse = async (courseId: string) => {
    setShowAlert(true);

    // Remove the course from the class schedule state
    setCourseInPlanner((prevSchedule) =>
      prevSchedule.filter((course) => course.id !== courseId)
    );

    // await deleteCourseOfUser(payload.id, courseId, accessToken);
    await deleteCourseFromStudyPlan(
      payload.id,
      selectedPlan.id,
      courseId,
      accessToken
    );

    setTimeout(() => setShowAlert(false), 1500);
  };

  // const getCourse = useCallback(async () => {
  //   if (accessToken) {
  //     const res = await getCourseOfUser(payload.id, accessToken);
  //     res && setClassSchedule(res);
  //   }
  // }, [payload.id, accessToken]);

  // useEffect(() => {
  //   getCourse();
  // }, [payload.id, accessToken, getCourse]);

  console.log(courseInPlanner);

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        error,
        addCourseError,
        fetchCourses,
        // classSchedule,
        // setClassSchedule,
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
