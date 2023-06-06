import { useCallback, useEffect, useRef, useState } from "react";
import { useStudyPlan } from "../hooks";

// components
import StudyPlan from "../components/StudyPlan";
import HorizontalCard from "../components/HorizontalCard";
import Modal from "../components/Modal";
import TotalCredits from "../components/TotalCredits";
import Header from "../components/Header";

// icon
import { AiOutlineDownload } from "react-icons/ai";

// interface
import { ICourseInSchedule } from "../models/course.interface";

// utils
import { IColor, getRandomColor } from "../utils/colors";
import { timeToCol } from "../utils/timeToColumn";
import { downloadImage } from "../utils/downloadPng";

interface IBgColor {
  [key: string]: string;
}

const Homepage = () => {
  const [courseInSchedule, setCourseInSchedule] = useState<{
    [key: string]: ICourseInSchedule[];
  }>({});

  const [bgColor, setBgColor] = useState<IBgColor>({});
  const {
    courseInPlanner,
    studyPlanOfUser,
    handleChooseStudyPlan,
    handleAddStudyPlan,
    handleDeleteStudyPlan,
    showAlert,
    selectedPlan,
  } = useStudyPlan();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const studyContainer = useRef(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
      <Header studyPlanName={selectedPlan.name} toggleModal={toggleModal} />
      <StudyPlan
        courseInSchedule={courseInSchedule}
        studyContainer={studyContainer}
      />
      <div className="container flex items-center justify-between px-5 mx-auto mb-10">
        {/* button download study plan */}
        <button
          disabled={courseInPlanner.length <= 0}
          onClick={() => downloadImage(studyContainer.current)}
          className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md gap-x-2 hover:bg-gray-50 disabled:opacity-25"
        >
          <AiOutlineDownload className="w-6 h-6" /> PNG
        </button>
        <TotalCredits courseInPlanner={courseInPlanner} />
      </div>
      <HorizontalCard color={bgColor} courseInPlanner={courseInPlanner} />
      <Modal
        studyPlan={studyPlanOfUser}
        handleSubmit={handleChooseStudyPlan}
        handleAddStudyPlan={handleAddStudyPlan}
        handleDeleteStudyPlan={handleDeleteStudyPlan}
        showAlert={showAlert}
        isOpenModal={isModalOpen}
        toggleModal={toggleModal}
      />
    </>
  );
};

export default Homepage;
