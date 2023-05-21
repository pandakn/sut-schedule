// import { useCourse } from "../hooks";
// import Alert from "./Alert";
// import { MdDelete } from "react-icons/md";
// import { AiOutlineDelete } from "react-icons/ai";

// const headerOfTable: string[] = [
//   "Course Code",
//   "Course Name",
//   "Sec.",
//   "Class Schedule",
//   "Midterm",
//   "Final",
//   "",
// ];

// const TableSchedule = () => {
//   const { classSchedule, removeCourse, showAlert } = useCourse();

//   return (
//     <div className="container mx-auto my-10">
//       {/* Alert */}
//       {showAlert && (
//         <Alert
//           textColor="#991b1b"
//           bgColor="#fef2f2"
//           icon={<AiOutlineDelete className="text-xl" />}
//         >
//           Course deleted successfully
//         </Alert>
//       )}
//       <div className="relative mx-5 overflow-x-auto">
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
//             <tr>
//               {headerOfTable.map((text, idx) => {
//                 return (
//                   <th key={idx} scope="col" className="px-6 py-3">
//                     {text}
//                   </th>
//                 );
//               })}
//             </tr>
//           </thead>
//           <tbody>
//             {/* map course */}
//             {classSchedule.map((course) => {
//               return (
//                 <tr
//                   key={`${course.courseCode}-${course.version}:${course.courseNameEN}/${course.section}`}
//                   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//                 >
//                   <td className="px-6 py-4 font-bold">
//                     {course.courseCode} - {course.version}
//                   </td>
//                   <td className="px-6 py-4 font-medium">
//                     <div className="leading-relaxed">
//                       <p className="font-semibold">{course.courseNameEN}</p>
//                       <p className="opacity-60">credit : {course.credit}</p>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">{course.section}</td>
//                   <td className="px-6 py-4">
//                     {course.classSchedule?.map(({ day, times, room }, idx) => {
//                       return (
//                         <div key={idx} className="flex gap-2 leading-relaxed">
//                           <p className="font-semibold">{day}</p>
//                           <p>{times}</p>
//                           <p className="underline">{room}</p>
//                         </div>
//                       );
//                     })}
//                   </td>
//                   <td className="px-6 py-4">
//                     {course.details.midExam?.slice(0, 35) || "-"}
//                   </td>
//                   <td className="px-6 py-4">
//                     {course.details.finalExam?.slice(0, 35) || "-"}
//                   </td>
//                   <td className="px-6 py-4">
//                     {/* remove course */}
//                     <button
//                       hidden={!course.classSchedule && true}
//                       onClick={() => removeCourse(course.id)}
//                     >
//                       <MdDelete className="text-red-500 h-7 w-7" />
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TableSchedule;
