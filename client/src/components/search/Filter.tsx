// constants
import { dayOfWeek, times } from "./constants";
import { CourseSearchParamsInterface } from "../../models/course.interface";

type FilterProps = {
  searchParams: CourseSearchParamsInterface;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Filter = ({
  searchParams,
  handleSelectChange,
  handleInputChange,
}: FilterProps) => {
  const disabledCombobox = () => {
    return searchParams.cmd === "2" && true;
  };

  return (
    <div className="absolute z-50">
      <div className="p-8 bg-white rounded-lg shadow-2xl ">
        <div className="space-y-4">
          {/* choose */}
          <div className="flex items-center">
            <input
              name="cmd"
              id="cmd"
              onChange={handleInputChange}
              type="checkbox"
              checked={searchParams.cmd === "1" && true}
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded "
            />
            <label className="ml-2 text-lg font-medium text-gray-900">
              Filter
            </label>
          </div>

          {/* day */}
          <div>
            <label className="block mb-2 font-bold text-gray-800">Day</label>
            <select
              disabled={disabledCombobox()}
              id="weekdays"
              name="weekdays"
              className="w-full p-2 border border-gray-300 rounded-lg disabled:opacity-40"
              value={searchParams.weekdays}
              onChange={handleSelectChange}
            >
              <option>Select a day</option>
              {dayOfWeek.map((day) => {
                return (
                  <option key={day.day} value={day.value}>
                    {day.day}
                  </option>
                );
              })}
            </select>
          </div>

          {/* time from */}
          <div>
            <label className="block mb-2 font-bold text-gray-800 ">
              Time From
            </label>
            <select
              disabled={disabledCombobox()}
              id="timefrom"
              name="timefrom"
              className="w-full p-2 border border-gray-300 rounded-lg disabled:opacity-40"
              value={searchParams.timefrom}
              onChange={handleSelectChange}
            >
              <option>Select a time</option>
              {times.map((time) => {
                return (
                  <option key={time.time} value={time.value}>
                    {time.time}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Time to */}
          <div>
            <label className="block mb-2 font-bold text-gray-800 ">
              Time To
            </label>
            <select
              disabled={disabledCombobox()}
              id="timeto"
              name="timeto"
              className="w-full p-2 border border-gray-300 rounded-lg disabled:opacity-40"
              value={searchParams.timeto}
              onChange={handleSelectChange}
            >
              <option>Select a time</option>
              {times.map((time) => {
                return (
                  <option key={time.time} value={time.value}>
                    {time.time}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
