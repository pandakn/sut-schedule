import { useCallback, useEffect, useState } from "react";
import { ICourseInSchedule } from "../models/course.interface";
import { timeToCol } from "../utils/timeToColumn";

type Props = {
  courseInSchedule: { [key: string]: ICourseInSchedule[] };
  day: string;
};

const CardOfSchedule = ({ courseInSchedule, day }: Props) => {
  const [groupCourses, setGroupCourses] = useState<ICourseInSchedule[] | null>(
    []
  );

  const groupCourse = useCallback(() => {
    const schedule = courseInSchedule[day];

    if (schedule) {
      const sortedSchedule = schedule.sort(
        (a, b) => timeToCol(a.timeFrom) - timeToCol(b.timeFrom)
      );
      return sortedSchedule;
    }

    return null;
  }, [courseInSchedule, day]);

  useEffect(() => {
    const res = groupCourse() || null;

    setGroupCourses(res);
  }, [courseInSchedule, day, groupCourse]);

  return (
    <>
      {groupCourses?.map((group, idx) => {
        const { startCol, endCol, name, code, section, textColor, bgColor } =
          group;

        return (
          <span
            key={`group-${idx}`}
            className="flex flex-col p-2 text-xs border rounded text-on-CardOfSchedule gap-y-2 md:text-sm"
            style={{
              color: `${textColor}`,
              backgroundColor: `${bgColor}`,
              borderColor: `${textColor}`,
              gridColumn: `${startCol}/${endCol}`,
            }}
          >
            <p className="font-bold">{code}</p>
            <p className="font-bold truncate">{name}</p>
            <p>Sec. {section}</p>
          </span>
        );
      })}
    </>
  );
};

export default CardOfSchedule;
