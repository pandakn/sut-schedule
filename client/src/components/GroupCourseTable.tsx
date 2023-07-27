import { useCourse, useStudyPlan } from "../hooks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// interfaces
import { IGroupedCourse } from "../models/course.interface";

import { colorOfDays } from "../utils/colors";

// icons
import { AiOutlineInfoCircle, AiOutlinePlusCircle } from "react-icons/ai";
import SkeletonCourseTable from "./SkeletonCourseTable";
import { useCallback, useEffect } from "react";

type Props = {
  data: IGroupedCourse[];
};

type DetailsProp = {
  course: IGroupedCourse;
};

const RenderDetails = ({ course }: DetailsProp) => {
  return (
    <div>
      <p>status: {course.courseStatus}</p>
      <section className="flex items-baseline gap-2 my-2">
        <p>condition:</p>
        <div className="flex flex-wrap gap-2">
          {course.courseCondition?.map((condition, i) => {
            return (
              <p
                key={`${course.courseCode}-${course.version}-condition-${i}`}
                className="px-2 py-1 bg-green-200 rounded-md"
              >
                {condition || "-"}
              </p>
            );
          }) || "-"}
        </div>
      </section>

      <section className="flex items-baseline gap-2 mb-2">
        <p>continue:</p>
        <div className="flex flex-wrap gap-2">
          {course.continueCourse?.map((con, i) => {
            return (
              <p
                key={`${course.courseCode}-${course.version}-continue-${i}`}
                className="px-2 py-1 bg-orange-200 rounded-md"
              >
                {con}
              </p>
            );
          }) || "-"}
        </div>
      </section>

      <section className="flex items-baseline gap-2">
        <p>equivalent:</p>
        <div className="flex flex-wrap gap-2">
          {course.equivalentCourse?.map((e, i) => {
            return (
              <div
                key={`${course.courseCode}-${course.version}-equivalent-${i}`}
              >
                <p className="px-2 py-1 rounded-md bg-blue-50">{e}</p>
              </div>
            );
          }) || "-"}
        </div>
      </section>
    </div>
  );
};

const GroupCourseTable = ({ data }: Props) => {
  const { addCourseToSchedule, addCourseError, showAlert, loading } =
    useCourse();

  const { selectedPlan } = useStudyPlan();
  const MySwal = withReactContent(Swal);

  const sweetAlert = useCallback(() => {
    const text = addCourseError.message.split("\n");
    const errorMsg = text[1].split(",");

    MySwal.fire({
      title: "The class schedule conflicts",
      icon: "error",
      html: (
        <div className="space-y-2">
          {errorMsg.map((msg, i) => (
            <p key={i} className="font-semibold text-red-600">
              {msg}
            </p>
          ))}
        </div>
      ),
    });
  }, [MySwal, addCourseError.message]);

  useEffect(() => {
    addCourseError.isError && showAlert && sweetAlert();
  }, [addCourseError.isError, showAlert, sweetAlert]);

  return (
    <div className="container mx-auto mt-5 mb-28">
      {!loading ? (
        <>
          {data.map((course) => {
            return (
              <div
                key={`${course.courseCode}-${course.version}-section:${course.sections}`}
                className="mx-5 mb-5 border rounded-lg shadow-md"
              >
                <div className="flex flex-col p-5 mb-3 gap-y-2">
                  <div className="mb-4 text-lg tracking-wide text-center md:text-2xl lg:text-3xl">
                    <h3 className="font-bold">
                      {course.courseCode}-{course.version}
                    </h3>
                    <p className="mt-2">{course.courseNameEN}</p>
                    <p className="mt-2">{course.courseNameTH}</p>
                  </div>
                  <p>credit: {course.credit}</p>
                  <p>degree: {course.degree}</p>
                  <p>
                    {course.department}, {course.faculty}
                  </p>
                  <RenderDetails
                    key={`${course.courseCode}-${course.version}`}
                    course={course}
                  />
                </div>

                {/* details each section */}
                <div className="flex flex-col gap-4">
                  {course.sections.map((sec) => {
                    return (
                      <div
                        key={sec.id}
                        className="flex flex-col justify-between border bg-neutral-50 text-clip md:flex-row"
                      >
                        <div className="pl-5 leading-relaxed">
                          <p className="mt-4 text-xl text-gray-500">
                            section: {sec.section}
                          </p>

                          {sec.classSchedule?.map((cs) => {
                            return (
                              <div
                                key={`${cs.day}-${cs.times}-${cs.room}`}
                                className="flex gap-2 text-lg"
                                style={{
                                  color: `${
                                    colorOfDays[cs.day.toLowerCase()].textColor
                                  }`,
                                }}
                              >
                                <p>{cs.day}</p>
                                <p>{cs.times}</p>
                                <u>{cs.room}</u>
                              </div>
                            );
                          })}
                          <div className="flex gap-2">
                            <p>total : {sec.seat.totalSeat}</p>
                            <p>registered : {sec.seat.registered}</p>
                            <p>remain : {sec.seat.remain}</p>
                          </div>
                          <p>language: {sec.language}</p>
                          <p className="mb-4 tracking-wide">
                            note :
                            <span className="pl-2 text-red-500">
                              {sec.note || "-"}
                            </span>
                          </p>
                        </div>
                        {/* button */}
                        <div className="flex">
                          <button
                            name="btnAdd"
                            // hidden={!sec.classSchedule && true}
                            onClick={() =>
                              addCourseToSchedule(selectedPlan.id, sec)
                            }
                            className="bg-green-400 btn-logo"
                          >
                            <AiOutlinePlusCircle className="logo-center " />
                          </button>
                          <button
                            name="btnInfo"
                            // hidden={!sec.classSchedule && true}
                            onClick={() => window.open(`${sec.url}`, "_blank")}
                            className="bg-blue-400 btn-logo "
                          >
                            <AiOutlineInfoCircle className="logo-center" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <SkeletonCourseTable count={5} />
        </>
      )}
    </div>
  );
};

export default GroupCourseTable;
