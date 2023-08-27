import { useCallback, useEffect, useRef, useState } from "react";
import { useStudyPlan } from "../hooks";

// components
import Schedule from "../components/Schedule";
import HorizontalCard from "../components/HorizontalCard";
import TotalCredits from "../components/TotalCredits";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import { Tooltip } from "react-tooltip";

// icon
import { AiOutlineDownload } from "react-icons/ai";

// interface
import { ICourseInSchedule } from "../models/course.interface";

// utils
import { IColor, getRandomColor } from "../utils/colors";
import { timeToCol } from "../utils/timeToColumn";
import { downloadImage } from "../utils/downloadPng";
import TableSchedule from "../components/TableSchedule";

interface IBgColor {
  [key: string]: string;
}

const toolTipContent = "Select card or table format below before downloading";

const SchedulePage = () => {
  const [courseInSchedule, setCourseInSchedule] = useState<{
    [key: string]: ICourseInSchedule[];
  }>({});

  const [bgColor, setBgColor] = useState<IBgColor>({});
  const { courseInPlanner, selectedPlan } = useStudyPlan();
  const scheduleContainer = useRef(null);
  const tableScheduleContainer = useRef(null);

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

  const handleDownloadImage = () => {
    // Wait for a brief moment for components to render completely
    downloadImage(scheduleContainer.current, tableScheduleContainer.current);
  };

  return (
    <>
      <Header studyPlanName={selectedPlan.name} />
      <Schedule
        courseInSchedule={courseInSchedule}
        scheduleContainer={scheduleContainer}
      />
      <div className="container flex items-center justify-between px-5 mx-auto mb-5">
        <div className="flex flex-wrap items-center gap-2">
          {/* button download study plan */}
          <button
            disabled={courseInPlanner.length <= 0}
            onClick={handleDownloadImage}
          >
            <a
              id="button-download"
              className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md gap-x-2 hover:bg-gray-800 hover:text-white disabled:opacity-25"
            >
              <AiOutlineDownload className="w-6 h-6" /> PNG
            </a>
            {/* tooltip */}
            <Tooltip
              // variant="info"
              anchorSelect="#button-download"
              content={toolTipContent}
              // style={{ color: "#333" }}
            />
          </button>
        </div>
        <TotalCredits courseInPlanner={courseInPlanner} />
      </div>

      <Tabs
        components={[
          <TableSchedule
            courseInPlanner={courseInPlanner}
            containerRef={tableScheduleContainer}
          />,
          <HorizontalCard
            color={bgColor}
            courseInPlanner={courseInPlanner}
            containerRef={tableScheduleContainer}
          />,
        ]}
      />
    </>
  );
};

export default SchedulePage;
