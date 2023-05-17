import React, { createContext, useEffect, useState } from "react";
import {
  CourseInterface,
  CourseDataInterface,
  CourseSearchParamsInterface,
  ClassScheduleInterface,
} from "../models/course.interface";
import { getCoursesData } from "../services/httpClient";

interface CourseContextValue {
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

const CourseContext = createContext<CourseContextValue>({
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
    throw new Error("removeCourse is not implemented");
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
  const [courses, setCourses] = useState<CourseInterface>({
    year: "",
    courseData: [],
  });
  // const [classSchedule, setClassSchedule] = useState<CourseDataInterface[]>([]);
  const [classSchedule, setClassSchedule] = useState<CourseDataInterface[]>(
    () => {
      const savedSchedule = localStorage.getItem("classSchedule");
      return savedSchedule ? JSON.parse(savedSchedule) : [];
    }
  );
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

      if (res.status) {
        setCourses({ year: res.data.year, courseData: res.data.courseData });
      } else {
        setError(res.data);
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
        const newCourseTime = nc.times.split("-");

        // JS Date it defaults to January 1st, 1970 at 00:00:00 UTC.
        const newCourseStartTime = new Date(
          `1970-01-01T${newCourseTime?.[0]}:00`
        );
        const newCourseEndTime = new Date(
          `1970-01-01T${newCourseTime?.[1]}:00`
        );

        if (elem.day !== nc.day) {
          // console.log("inside if elem", elem.day, elem.times);
          // console.log("inside if new course", nc.day, nc.times);
          return false;
        }

        // console.log("outside elem", elem.day, elem.times);
        // console.log("outside new course", nc.day, nc.times);

        const coursesInScheduleTime = elem.times.split("-");
        const coursesInScheduleStartTime = new Date(
          `1970-01-01T${coursesInScheduleTime[0]}:00`
        );
        const coursesInScheduleEndTime = new Date(
          `1970-01-01T${coursesInScheduleTime[1]}:00`
        );

        // console.log("newCourseStartTime", newCourseStartTime);
        // console.log("newCourseEndTime", newCourseEndTime);

        // console.log("coursesInScheduleStartTime", coursesInScheduleStartTime);
        // console.log("coursesInScheduleEndTime", coursesInScheduleEndTime);

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

        console.log("overlaps", overlaps);

        return overlaps;
      });
    });
    console.log("sameTime", sameTime);

    return sameTime;
  };

  const addCourseToSchedule = (course: CourseDataInterface) => {
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
      // alert("Cannot add the course");
      setShowAlert(true);
      setAddCourseError(true);
      const timer = setTimeout(() => setShowAlert(false), 2000);

      return () => clearTimeout(timer);
    }

    setShowAlert(true);
    setClassSchedule((prev) => {
      return [...prev, course];
    });

    const timer = setTimeout(() => setShowAlert(false), 1500);
    return () => clearTimeout(timer);
  };

  const removeCourse = (id: string) => {
    setShowAlert(true);

    // Remove the course from the class schedule state
    setClassSchedule((prevSchedule) =>
      prevSchedule.filter((course) => course.id !== id)
    );
    // window.location.href = "/schedule";
    // navigate("/schedule");

    setTimeout(() => setShowAlert(false), 1500);
    // return () => clearTimeout(timer);
  };

  useEffect(() => {
    localStorage.setItem("classSchedule", JSON.stringify(classSchedule));
  }, [classSchedule]);

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
export type { CourseContextValue };
