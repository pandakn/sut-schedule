import { useState } from "react";

// Support strict mode
// ref : https://github.com/atlassian/react-beautiful-dnd/issues/2437
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

// component
import Alert from "./Alert";

// icons
import { AiOutlineCheckCircle, AiOutlineCopy } from "react-icons/ai";

// model
import { CourseDataInterface } from "../models/course.interface";

const headerOfTable: string[] = [
  "",
  "Course Code",
  "Course Name",
  "Sec.",
  "Class Schedule",
  "Midterm",
  "Final",
];

type TableScheduleProp = {
  courseInPlanner: CourseDataInterface[];
};

const TableSchedule = ({ courseInPlanner }: TableScheduleProp) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showMsg, setShowMsg] = useState("");
  const [courseData, setCourseData] =
    useState<CourseDataInterface[]>(courseInPlanner);

  const handleCopyCourseCode = (courseCode: string) => {
    navigator.clipboard
      .writeText(courseCode)
      .then(() => {
        setShowAlert(true);
        setShowMsg(`copied to clipboard: ${courseCode}`);
      })
      .catch((error) => {
        console.error("Failed to copy course code:", error);
      })
      .finally(() => {
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
      });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // Reorder the courseData array based on the drag and drop result
    const items = Array.from(courseData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the state with the reordered array
    setCourseData(items);
  };

  return (
    <div className="mb-16">
      {/* Alert */}
      {showAlert && (
        <Alert
          textColor="#166534"
          bgColor="#f0fdf4"
          icon={<AiOutlineCheckCircle className="text-xl" />}
        >
          {showMsg}
        </Alert>
      )}

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
                    {courseData.map((course, index) => (
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
                                <p className="font-semibold">
                                  {course.courseNameEN}
                                </p>
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
                              {course.details.midExam?.slice(0, 32) || "-"}
                            </td>
                            <td className="px-6 py-4 ">
                              {course.details.finalExam?.slice(0, 32) || "-"}
                            </td>
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
