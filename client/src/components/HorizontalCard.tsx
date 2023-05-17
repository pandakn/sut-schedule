import { useCourse } from "../hooks/useCourse";
import Alert from "./Alert";
import { MdDelete } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

interface Color {
  [key: string]: string;
}

type Props = {
  color: Color;
};

const HorizontalCard = ({ color }: Props) => {
  const { classSchedule, removeCourse, showAlert } = useCourse();

  return (
    <div className="px-4">
      {showAlert && (
        <Alert
          textColor="#991b1b"
          bgColor="#fef2f2"
          icon={<AiOutlineDelete className="text-xl" />}
        >
          Course deleted successfully
        </Alert>
      )}
      {classSchedule.map((cs) => {
        return (
          <div
            key={cs.courseCode}
            className="container grid gap-4 mx-auto my-10 "
          >
            <div className="relative grid justify-between grid-cols-1 mx-5 border rounded-md sm:grid-cols-10">
              <div
                className="col-span-1 bg-blue-100 border"
                style={{
                  backgroundColor: `${color[cs.courseCode]}`,
                }}
              ></div>
              <div className="col-span-1 p-4 leading-normal sm:col-span-7">
                <h5 className="mb-2 text-sm font-medium text-gray-800 tracking- sm:text-base md:text-2xl">
                  {cs.courseCode}-{cs.version} : {cs.courseNameEN}
                </h5>

                <section className="flex gap-2 mb-2 md:gap-1 md:flex-col">
                  <p className="text-sm font-light text-gray-400 md:text-xl">
                    credit: {cs.credit}
                  </p>
                  <p className="text-sm font-light text-gray-400 ext-sm md:text-xl">
                    Sec. {cs.section}
                  </p>
                </section>

                {/* schedule */}
                {cs.classSchedule?.map(({ day, times, room }, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex gap-2 text-sm font-light leading-relaxed text-gray-500 md:text-lg"
                    >
                      <p className="font-semibold">{day}</p>
                      <p>{times}</p>
                      <p className="underline">{room}</p>
                    </div>
                  );
                })}
              </div>
              <div className="absolute col-span-1 right-2 md:right-5 top-4 sm:col-span-1">
                <button
                  hidden={!cs.classSchedule && true}
                  onClick={() => removeCourse(cs.id)}
                >
                  <MdDelete className="text-red-500 h-7 w-7" />
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
