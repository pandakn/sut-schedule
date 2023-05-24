import React, { createContext, useCallback, useEffect, useState } from "react";
import {
  CourseInterface,
  CourseDataInterface,
  CourseSearchParamsInterface,
  ClassScheduleInterface,
} from "../models/course.interface";
import {
  addCourseData,
  deleteCourseOfUser,
  getCourseOfUser,
  getCoursesData,
} from "../services/httpClient";
import { useAuth } from "../hooks";

interface CourseContextType {
  courses: CourseInterface;
  loading: boolean;
  error: string | null;
  addCourseError: boolean;
  fetchCourses: (params: CourseSearchParamsInterface) => Promise<void>;
  classSchedule: CourseDataInterface[];
  setClassSchedule: React.Dispatch<React.SetStateAction<CourseDataInterface[]>>;
  addCourseToSchedule: (course: CourseDataInterface) => void;
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
  classSchedule: [],
  setClassSchedule: () => {
    throw new Error("setClassSchedule is not implemented");
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
  const [courses, setCourses] = useState<CourseInterface>({
    year: "",
    courseData: [],
  });
  const [classSchedule, setClassSchedule] = useState<CourseDataInterface[]>([]);
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

  const handleSameSchedule = (
    newCourse: ClassScheduleInterface[] | null,
    coursesInSchedule: ClassScheduleInterface[] | null
  ) => {
    if (newCourse === null) return;

    const sameTime = coursesInSchedule?.some((elem) => {
      return newCourse.some((nc) => {
        const [newCourseStartTime, newCourseEndTime] = nc.times.split("-");

        if (elem.day !== nc.day) {
          return false;
        }

        const [coursesInScheduleStartTime, coursesInScheduleEndTime] =
          elem.times.split("-");

        // example check time range
        // a, b = new course   c, d = course in schedule
        //   a          b
        // 8:00       11:00
        // |----------|
        //        c          d
        //      10:00      12:00
        //       |----------|
        const overlaps =
          newCourseStartTime < coursesInScheduleEndTime &&
          newCourseEndTime > coursesInScheduleStartTime;

        return overlaps;
      });
    });

    return sameTime;
  };

  const addCourseToSchedule = async (course: CourseDataInterface) => {
    setAddCourseError(false);
    const isSameSchedule: boolean = classSchedule.some((c) => {
      const checkCourseCode = c.courseCode === course.courseCode;
      const sameSchedule = handleSameSchedule(
        course.classSchedule,
        c.classSchedule
      );

      return checkCourseCode || sameSchedule ? true : false;
    });

    if (isSameSchedule) {
      setShowAlert(true);
      setAddCourseError(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      const userId = payload.id;
      await addCourseData(userId, course, accessToken);
      setClassSchedule((prev) => {
        return [...prev, course];
      });
    }

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500);
  };

  const removeCourse = async (courseId: string) => {
    setShowAlert(true);

    // Remove the course from the class schedule state
    setClassSchedule((prevSchedule) =>
      prevSchedule.filter((course) => course.id !== courseId)
    );

    await deleteCourseOfUser(payload.id, courseId, accessToken);

    setTimeout(() => setShowAlert(false), 1500);
  };

  const getCourse = useCallback(async () => {
    if (accessToken) {
      const res = await getCourseOfUser(payload.id, accessToken);
      res && setClassSchedule(res);
    }
  }, [payload.id, accessToken]);

  useEffect(() => {
    getCourse();
  }, [payload.id, accessToken, getCourse]);

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        error,
        addCourseError,
        fetchCourses,
        classSchedule,
        setClassSchedule,
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
