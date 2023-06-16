// hooks
import { useCallback, useEffect, useState } from "react";
import { useCourse } from "../hooks";

// components
import SearchBox from "../components/SearchBox";
// import TableOfClass from "../components/TableOfClass";
import GroupCourseTable from "../components/GroupCourseTable";

// interface
import { IGroupedCourse } from "../models/course.interface";

const CourseTable = () => {
  const { courses, error, loading } = useCourse();
  const [groupCoursesData, setGroupCoursesData] = useState<IGroupedCourse[]>(
    []
  );

  // Group courses by course code and version
  const groupedCourses = useCallback(() => {
    return courses.courseData.reduce((acc, course) => {
      const key = `${course.courseCode}-${course.version}`;
      const { courseNameEN, courseNameTH, degree, department, faculty } =
        course;

      if (!acc[key]) {
        acc[key] = {
          courseCode: course.courseCode,
          version: course.version,
          courseNameEN,
          courseNameTH,
          credit: course.credit,
          degree,
          department,
          faculty,
          courseStatus: course.details.courseStatus,
          courseCondition: course.details.courseCondition,
          continueCourse: course.details.continueCourse,
          equivalentCourse: course.details.equivalentCourse,
          sections: [],
        };
      }

      // Check if the current section has already been added
      const sectionExists = acc[key].sections.some(
        (existingSection) => existingSection.section === course.section
      );

      // If the section does not exist yet, add it
      if (!sectionExists) {
        acc[key].sections.push(course);
      }

      return acc;
    }, {} as { [key: string]: IGroupedCourse });
  }, [courses]);

  useEffect(() => {
    const res = groupedCourses();
    const groupedCoursesArray = Object.values(res);
    groupedCoursesArray && setGroupCoursesData(groupedCoursesArray);
  }, [courses, groupedCourses]);

  return (
    <>
      <SearchBox />
      {error ? (
        <div className="container mx-auto mt-10 text-center">
          <p className="text-3xl">{error}</p>
        </div>
      ) : (
        <>
          {groupCoursesData.length > 0 && !loading && (
            <h3 className="container px-5 mx-auto mt-10 text-2xl tracking-wider">
              Year : {courses.year}
            </h3>
          )}
          <GroupCourseTable data={groupCoursesData} />
        </>
      )}
    </>
  );
};

export default CourseTable;
