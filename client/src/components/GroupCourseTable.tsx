// interfaces
import { CourseDataInterface } from "../models/course.interface";

interface GroupedCourse {
  courseCode: string;
  version: string;
  courseNameEN: string;
  courseNameTH: string;
  credit: string;
  degree: string;
  department: string;
  faculty: string;
  courseStatus: string;
  courseCondition: string[] | null;
  continueCourse: string[] | null;
  equivalentCourse: string[] | null;
  sections: CourseDataInterface[];
}

type Props = {
  data: GroupedCourse[];
};

type DetailsProp = {
  course: GroupedCourse;
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
              <p key={i} className="px-2 py-1 rounded-md bg-blue-50">
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
              <p key={i} className="px-2 py-1 rounded-md bg-blue-50">
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
                <p key={i} className="px-2 py-1 rounded-md bg-blue-50">
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
  return (
    <div className="mx-5 my-10">
      {data.map((course) => {
        return (
          <div className="p-5 mb-5 bg-red-50">
            <div className="mb-3">
              <h3 className="mb-2 text-xl">
                {course.courseCode} {course.courseNameEN}
              </h3>
              <p>credit: {course.credit}</p>
              <p>degree: {course.degree}</p>
              <p>
                {course.department}, {course.faculty}
              </p>
              <RenderDetails course={course} />
            </div>
            <div className="flex flex-col gap-4">
              {course.sections.map((sec) => {
                return (
                  <div key={sec.id} className="bg-white">
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
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupCourseTable;
