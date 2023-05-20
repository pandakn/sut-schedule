import { useCourse } from "../hooks/useCourse";

// components
import Alert from "./Alert";
import { Loading } from "react-loading-dot";

// icon
import { AiOutlineCheckCircle } from "react-icons/ai";
import { VscError } from "react-icons/vsc";

const headerOfTable: string[] = [
  "Course Code",
  "Course Name",
  "Sec.",
  "Class Schedule",
  "Midterm",
  "Final",
  "",
];

const TableOfClass = () => {
  const {
    courses,
    loading,
    error,
    addCourseError,
    showAlert,
    addCourseToSchedule,
  } = useCourse();

  if (error) {
    return (
      <div className="container mx-auto my-10 text-center">
        <p className="text-3xl">{error}</p>
      </div>
    );
  }

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
        <div className="relative mx-5 overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {headerOfTable.map((text, idx) => {
                  return (
                    <th key={idx} scope="col" className="px-6 py-3">
                      {text}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {/* map course */}
              {courses.courseData.map((course) => {
                return (
                  <tr
                    key={`${course.courseCode}-${course.version}:${course.courseNameEN}/${course.section}`}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-bold">
                      {course.courseCode} - {course.version}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      <div className="leading-relaxed">
                        <p className="font-semibold">{course.courseNameEN}</p>
                        <p className="opacity-60">credit : {course.credit}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{course.section}</td>
                    <td className="px-6 py-4">
                      {course.classSchedule?.map(
                        ({ day, times, room }, idx) => {
                          return (
                            <div
                              key={idx}
                              className="flex gap-2 leading-relaxed"
                            >
                              <p className="font-semibold">{day}</p>
                              <p>{times}</p>
                              <p className="underline">{room}</p>
                            </div>
                          );
                        }
                      ) || "-"}
                    </td>
                    <td className="px-6 py-4">
                      {course.details.midExam?.slice(0, 35) || "-"}
                    </td>
                    <td className="px-6 py-4">
                      {course.details.finalExam?.slice(0, 35) || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        hidden={!course.classSchedule && true}
                        onClick={() => addCourseToSchedule(course)}
                        className="px-2 py-1 text-white bg-green-500 rounded-sm"
                      >
                        +
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Loading background="#6C9BCF" duration="0.6s" />
      )}
    </div>
  );
};

export default TableOfClass;
