import { ClassScheduleInterface } from "../models/course.interface";

export const handleSameSchedule = (
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
