import { useCallback, useEffect, useState } from "react";
import { useCourse } from "../hooks";

// components
import StudyPlan from "../components/StudyPlan";
import HorizontalCard from "../components/HorizontalCard";

// interface
import { ICourseInSchedule } from "../models/course.interface";

// utils
import { IColor, getRandomColor } from "../utils/colors";
import { timeToCol } from "../utils/timeToColumn";

interface IBgColor {
  [key: string]: string;
}

const Schedule = () => {
  const [courseInSchedule, setCourseInSchedule] = useState<{
    [key: string]: ICourseInSchedule[];
  }>({});

  const [bgColor, setBgColor] = useState<IBgColor>({});
  const { classSchedule } = useCourse();

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
    const res = mappedCourses();
    setCourseInSchedule(res);
  }, [classSchedule, mappedCourses]);

  return (
    <>
      <StudyPlan courseInSchedule={courseInSchedule} />
      <div className="container mx-auto px-9 md:px-5 md:text-xl text-end">
        <p className="tracking-wide">
          total credit:{" "}
          <span className="ml-2">
            {classSchedule.reduce(
              (sum, cs) => sum + parseInt(cs.credit.split(" ")[0]),
              0
            )}
          </span>{" "}
          {classSchedule.reduce(
            (sum, cs) => sum + parseInt(cs.credit.split(" ")[0]),
            0
          ) > 1
            ? "credits"
            : "credit"}
        </p>
      </div>
      <HorizontalCard color={bgColor} />
    </>
  );
};

export default Schedule;
