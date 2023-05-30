import { useCallback, useEffect, useState } from "react";
import { useStudyPlan } from "../hooks";

// components
import StudyPlan from "../components/StudyPlan";
import HorizontalCard from "../components/HorizontalCard";
import Modal from "../components/Modal";

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

  // console.log("courseInSchedule", courseInSchedule);

  const [bgColor, setBgColor] = useState<IBgColor>({});

  const {
    courseInPlanner,
    studyPlan,
    handleChooseStudyPlan,
    handleAddStudyPlan,
    handleDeleteStudyPlan,
    showAlert,
  } = useStudyPlan();

  const mappedCourses = useCallback(() => {
    if (!Array.isArray(courseInPlanner)) {
      return {};
    }

    const subjectColors: { [key: string]: IColor } = {};

    return courseInPlanner.reduce<{ [key: string]: ICourseInSchedule[] }>(
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
  }, [courseInPlanner]);

  useEffect(() => {
    const res = mappedCourses();
    setCourseInSchedule(res);
  }, [mappedCourses, courseInPlanner]);

  return (
    <>
      <Modal
        studyPlan={studyPlan}
        handleSubmit={handleChooseStudyPlan}
        handleAddStudyPlan={handleAddStudyPlan}
        handleDeleteStudyPlan={handleDeleteStudyPlan}
        showAlert={showAlert}
      />
      <StudyPlan courseInSchedule={courseInSchedule} />
      <div className="container mx-auto px-9 md:px-5 md:text-xl text-end">
        <p className="tracking-wide">
          total credit:{" "}
          <span className="ml-2">
            {courseInPlanner.reduce(
              (sum, cs) => sum + parseInt(cs.credit.split(" ")[0]),
              0
            )}
          </span>{" "}
          {courseInPlanner.reduce(
            (sum, cs) => sum + parseInt(cs.credit.split(" ")[0]),
            0
          ) > 1
            ? "credits"
            : "credit"}
        </p>
      </div>
      <HorizontalCard color={bgColor} courseInPlanner={courseInPlanner} />
    </>
  );
};

export default Schedule;
