import { useAuth, useCourse, useStudyPlan } from "../hooks";

// Support strict mode
// ref : https://github.com/atlassian/react-beautiful-dnd/issues/2437
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

// icons
import { AiOutlineCopy } from "react-icons/ai";

// model
import { CourseDataInterface } from "../models/course.interface";
import { reOrderOfCourseInStudyPlan } from "../services/httpClient";
import toast from "react-hot-toast";
import ShowExam from "./ShowExam";
import { MdDelete } from "react-icons/md";

const headerOfTable: string[] = [
  "",
  "Course Code",
  "Course Name",
  "Sec.",
  "Class Schedule",
  "Midterm",
  "Final",
  "",
];

type TableScheduleProp = {
  courseInPlanner: CourseDataInterface[];
  containerRef: React.MutableRefObject<null>;
};

const TableSchedule = ({
  courseInPlanner,
  containerRef,
}: TableScheduleProp) => {
  const { selectedPlan, setCourseInPlanner } = useStudyPlan();
  const { accessToken } = useAuth();
  const { removeCourse } = useCourse();

  const handleCopyCourseCode = (courseCode: string) => {
    navigator.clipboard
      .writeText(courseCode)
      .then(() => {
        toast.success(`copied to clipboard: ${courseCode}`, { duration: 1000 });
      })
      .catch((error) => {
        console.error("Failed to copy course code:", error);
      });
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    // Reorder the courseData array based on the drag and drop result
    const items = Array.from(courseInPlanner);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the state with the reordered array

    if (accessToken) {
      const res = await reOrderOfCourseInStudyPlan(
        selectedPlan.id,
        items,
        accessToken
      );
      res && setCourseInPlanner(items);
    }
  };

  return (
    <div id="table-schedule" className="mb-16" ref={containerRef}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="container mx-auto">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
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
              <Droppable droppableId="tableSchedule">
                {(provided) => (
                  <tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {/* map course */}
                    {courseInPlanner.map((course, index) => (
                      <Draggable
                        key={course.courseCode}
                        draggableId={course.courseCode}
                        index={index}
                      >
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="bg-white border-b"
                          >
                            <td
                              {...provided.dragHandleProps}
                              className="text-2xl text-center"
                            >
                              =
                            </td>
                            <td className="px-4 py-2 font-bold">
                              <button
                                onClick={() =>
                                  handleCopyCourseCode(course.courseCode)
                                }
                                className="flex gap-1 px-2 py-1 hover:bg-gray-100"
                              >
                                <div>
                                  {course.courseCode} - {course.version}
                                </div>
                                <AiOutlineCopy className="w-4 h-4" />
                              </button>
                            </td>
                            <td className="px-6 py-4 font-medium">
                              <div className="leading-relaxed">
                                <a
                                  href={course.url}
                                  target="_blank`"
                                  className="font-semibold hover:underline"
                                >
                                  {course.courseNameEN}
                                </a>
                                <p className="opacity-60">
                                  credit : {course.credit}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              {course.section}
                            </td>
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
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <ShowExam
                                date={course.details.midExam?.date}
                                month={course.details.midExam?.month}
                                times={course.details.midExam?.times}
                                year={course.details.midExam?.yearStr}
                              />
                            </td>
                            <td className="px-6 py-4">
                              <ShowExam
                                date={course.details.finalExam?.date}
                                month={course.details.finalExam?.month}
                                times={course.details.finalExam?.times}
                                year={course.details.finalExam?.yearStr}
                              />
                            </td>
                            <div className="px-6 py-4">
                              <button
                                name="btnDelete"
                                aria-label={`remove course: ${course.courseCode}`}
                                // hidden={!cs.classSchedule && true}
                                onClick={() => removeCourse(course.id)}
                              >
                                <MdDelete className="w-7 h-7 text-red-500 hover:opacity-70" />
                              </button>
                            </div>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TableSchedule;
