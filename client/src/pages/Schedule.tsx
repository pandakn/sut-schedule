import { useCallback, useEffect, useState } from "react";
import { useCourse, useAuth } from "../hooks";

import StudyPlan from "../components/StudyPlan";
// import TableSchedule from "../components/TableSchedule";
import HorizontalCard from "../components/HorizontalCard";
import { ICourseInSchedule } from "../models/course.interface";
import { IColor, getRandomColor } from "../utils/colors";

import { getCourseOfUser } from "../services/httpClient";

const timesOfDay = [
  "Day/Time",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

interface IBgColor {
  [key: string]: string;
}

const Schedule = () => {
  const [courseInSchedule, setCourseInSchedule] = useState<{
    [key: string]: ICourseInSchedule[];
  }>({});

  const [bgColor, setBgColor] = useState<IBgColor>({});
  const { classSchedule } = useCourse();
  const { accessToken, payload } = useAuth();

  console.log("classSchedule", classSchedule);

  const fetchCourseOfUser = useCallback(async () => {
    if (accessToken) {
      await getCourseOfUser(payload.id, accessToken);
    }
  }, [accessToken, payload.id]);

  const timeToCol = (timeString: string): number => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const remainder = minutes / 60;
    const numberOfColumns = timesOfDay.length;
    const calculatedCol = (hours + remainder) * 2 - numberOfColumns + 2;

    return calculatedCol;
  };

  const mappedCourses = useCallback(() => {
    if (!Array.isArray(classSchedule)) {
      return {};
    }

    const subjectColors: { [key: string]: IColor } = {};

    return classSchedule.reduce<{ [key: string]: ICourseInSchedule[] }>(
      (acc, course) => {
        course.classSchedule?.map((c) => {
          const [start, end] = c.times.split("-");
          const startCol = timeToCol(start);
          const endCol = timeToCol(end);
          const dayLowerCase = c.day.toLowerCase();

          const subjectCode = course.courseCode;

          let subjectColor = subjectColors[subjectCode];
          if (!subjectColor) {
            const { textColor, bgColor } = getRandomColor();
            subjectColor = { textColor: textColor, bgColor: bgColor };
            subjectColors[subjectCode] = subjectColor;
          }

          const mappedCourse: ICourseInSchedule = {
            id: course.id,
            code: course.courseCode,
            name: course.courseNameEN,
            section: course.section,
            day: c.day,
            startCol,
            endCol,
            timeFrom: start,
            timeTo: end,
            textColor: subjectColor.textColor,
            bgColor: subjectColor.bgColor,
          };

          setBgColor((prev) => {
            return {
              ...prev,
              [mappedCourse.code]: mappedCourse.bgColor,
            };
          });

          if (dayLowerCase in acc) {
            acc[dayLowerCase].push(mappedCourse);
          } else {
            acc[dayLowerCase] = [mappedCourse];
          }
        });

        return acc;
      },
      {}
    );
  }, [classSchedule]);

  useEffect(() => {
    fetchCourseOfUser();
    const res = mappedCourses();
    setCourseInSchedule(res);
  }, [classSchedule, mappedCourses, fetchCourseOfUser]);

  return (
    <>
      <StudyPlan courseInSchedule={courseInSchedule} />
      {/* <TableSchedule /> */}
      <HorizontalCard color={bgColor} />
    </>
  );
};

export default Schedule;
