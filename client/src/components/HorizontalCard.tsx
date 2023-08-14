import { useCourse } from "../hooks";
import { MdDelete } from "react-icons/md";
import { CourseDataInterface } from "../models/course.interface";
import { colorOfDays } from "../utils/colors";

interface Color {
  [key: string]: string;
}

type Props = {
  color: Color;
  courseInPlanner: CourseDataInterface[];
  containerRef: React.MutableRefObject<null>;
};

const HorizontalCard = ({ color, courseInPlanner, containerRef }: Props) => {
  const { removeCourse } = useCourse();

  return (
    <div className="mb-20" ref={containerRef}>
      {courseInPlanner.map((cs) => {
        return (
          <div
            key={cs.courseCode}
            className="container grid gap-4 mx-auto my-5"
          >
            <div className="relative grid justify-between grid-cols-1 border rounded-md sm:grid-cols-10">
              {/* color */}
              <div
                className="col-span-1 bg-blue-100 border"
                style={{
                  backgroundColor: `${color[cs.courseCode]}`,
                }}
              ></div>

              <div className="col-span-1 p-4 px-6 leading-normal sm:col-span-7">
                <h5 className="mb-2 text-sm font-semibold text-gray-800 tracking- sm:text-base md:text-xl">
                  {cs.courseCode}-{cs.version} : {cs.courseNameEN}
                </h5>

                <section className="flex gap-2 mb-2 md:gap-1 md:flex-col">
                  <p className="text-sm font-light text-gray-400 md:text-lg">
                    credit: {cs.credit}
                  </p>
                  <p className="text-sm font-light text-gray-400 ext-sm md:text-lg">
                    Sec. {cs.section}
                  </p>
                </section>

                {/* schedule */}
                {cs.classSchedule?.map(({ day, times, room }, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex gap-2 text-sm leading-relaxed text-gray-500 md:text-lg"
                      style={{
                        color: `${colorOfDays[day.toLowerCase()].textColor}`,
                      }}
                    >
                      <p className="font-semibold">{day}</p>
                      <p>{times}</p>
                      <p className="underline">{room}</p>
                    </div>
                  );
                })}
                {/* exam */}
                <section className="flex flex-col gap-2 mt-2 text-gray-600">
                  <p className="text-base font-semibold">
                    Mid:
                    <span className="pl-3 font-light">
                      {cs.details?.midExam || "-"}
                    </span>
                  </p>
                  <p className="text-base font-semibold">
                    Final:
                    <span className="pl-2 font-light">
                      {cs.details?.finalExam || "-"}
                    </span>
                  </p>
                </section>
              </div>
              <div className="absolute col-span-1 right-2 md:right-5 top-4 sm:col-span-1">
                <button
                  name="btnDelete"
                  aria-label={`remove course: ${cs.courseCode}`}
                  // hidden={!cs.classSchedule && true}
                  onClick={() => removeCourse(cs.id)}
                >
                  <MdDelete className="w-8 h-8 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalCard;
