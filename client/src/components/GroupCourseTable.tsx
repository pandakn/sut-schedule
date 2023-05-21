import { Loading } from "react-loading-dot";
import { useCourse } from "../hooks";

// interfaces
import { IGroupedCourse } from "../models/course.interface";
import Alert from "./Alert";

// icons
import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { VscError } from "react-icons/vsc";

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
      <section className="flex items-center gap-2">
        <p>condition:</p>
        <div className="flex gap-2">
          {course.courseCondition?.map((condition, i) => {
            return (
              <p
                key={`${course.courseCode}-${course.version}-${condition + i}`}
                className="px-2 py-1 rounded-md bg-blue-50"
              >
                {condition || "-"}
              </p>
            );
          }) || "-"}
        </div>
      </section>

      <section className="flex items-center gap-2">
        <p>continue:</p>
        <div className="flex gap-2">
          {course.continueCourse?.map((con, i) => {
            return (
              <p
                key={`${course.courseCode}-${course.version}-${con + i}`}
                className="px-2 py-1 rounded-md bg-blue-50"
              >
                {con}
              </p>
            );
          }) || "-"}
        </div>
      </section>

      <section className="flex items-center gap-2">
        <p>equivalent:</p>
        <div className="flex gap-2">
          {course.equivalentCourse?.map((e, i) => {
            return (
              <div>
                <p
                  key={`${course.courseCode}-${course.version + course}-${
                    e + i
                  }`}
                  className="px-2 py-1 rounded-md bg-blue-50"
                >
                  {e}
                </p>
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

  return (
    <div className="container mx-auto my-10">
      {/* Alert */}
      {!addCourseError && showAlert && (
        <Alert
          textColor="#166534"
          bgColor="#f0fdf4"
          icon={<AiOutlineCheckCircle className="text-xl" />}
        >
          Course added successfully
        </Alert>
      )}

      {addCourseError && showAlert && (
        <Alert
          textColor="#991b1b"
          bgColor="#fef2f2"
          icon={<VscError className="text-xl" />}
        >
          Cannot add the course
        </Alert>
      )}

      {!loading ? (
        <>
          {data.map((course) => {
            return (
              <div
                key={`${course.courseCode}-${course.version}`}
                className="mx-5 mb-5 border rounded-lg"
              >
                <div className="p-5 mb-3 bg-blue-50">
                  <h3 className="mb-2 text-xl tracking-wide">
                    {course.courseCode}-{course.version} : {course.courseNameEN}
                  </h3>
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
                <div className="flex flex-col gap-4 p-5">
                  {course.sections.map((sec) => {
                    return (
                      <div
                        key={sec.id}
                        className="flex flex-col justify-between bg-white border md:flex-row"
                      >
                        <div>
                          <div className="flex gap-2">
                            <p>total : {sec.seat.totalSeat}</p>
                            <p>registered : {sec.seat.registered}</p>
                            <p>remain : {sec.seat.remain}</p>
                          </div>
                          <p>section : {sec.section}</p>
                          <p>language: {sec.language}</p>
                          <p className="tracking-wide">
                            note :
                            <span className="pl-2 text-red-500">
                              {sec.note || "-"}
                            </span>
                          </p>
                        </div>
                        {/* button */}
                        <div className="flex ">
                          <button
                            hidden={!sec.classSchedule && true}
                            onClick={() => addCourseToSchedule(sec)}
                            className="bg-green-400 btn-logo"
                          >
                            <AiOutlinePlusCircle className="logo-center " />
                          </button>
                          <button
                            hidden={!sec.classSchedule && true}
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
        <Loading background="#6C9BCF" duration="0.6s" />
      )}
    </div>
  );
};

export default GroupCourseTable;
