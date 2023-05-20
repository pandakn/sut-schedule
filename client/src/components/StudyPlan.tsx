// component
import CardOfSchedule from "./CardOfSchedule";
// interface
import { ICourseInSchedule } from "../models/course.interface";

import { colorOfDays } from "../utils/colors";

// const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const daysOfWeek = ["mo", "tu", "we", "th", "fr", "sa", "su"];

const timesOfDay = [
  "Day/Time",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

type Props = {
  courseInSchedule: { [key: string]: ICourseInSchedule[] };
};

const StudyPlan = ({ courseInSchedule }: Props) => {
  return (
    <div className="container mx-auto my-10 overflow-x-auto">
      <div className="min-w-[700px] rounded-lg mx-5">
        {/* header */}
        <div
          className="grid overflow-x-auto"
          style={{
            gridTemplateColumns: `repeat(${
              timesOfDay.length * 2
            }, minmax(0, 1fr))`,
          }}
        >
          {timesOfDay.map((time, idx) => (
            <div
              key={`time-${idx}`}
              className="h-16 col-span-2 px-2 py-4 text-xs border border-gray-200 overflow-clip md:text-sm bg-blue-50 bg-opacity-30"
            >
              {time}
            </div>
          ))}
        </div>
        {daysOfWeek.map((day, idx) => (
          <div
            key={`day-${idx}`}
            style={{
              gridTemplateColumns: `repeat(${
                timesOfDay.length * 2
              }, minmax(0, 1fr))`,
            }}
            className="grid border border-gray-100 min-h-16 md:min-h-24"
          >
            <div
              style={{ backgroundColor: `${colorOfDays[day].bgColor}` }}
              className="col-span-2 p-1 border-r-2 md:p-3"
            >
              <span
                style={{
                  color: `${colorOfDays[day].textColor}`,
                }}
                className="text-base font-extrabold uppercase"
              >
                {day}
              </span>
            </div>
            {/* Card */}
            <CardOfSchedule courseInSchedule={courseInSchedule} day={day} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyPlan;
