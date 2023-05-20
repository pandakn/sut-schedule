import React, { useState } from "react";
import { useCourse } from "../hooks";

// acadyear
const currentYear = new Date().getFullYear() + 543;
const acadyear = Array.from({ length: 3 }, (_, i) =>
  (currentYear - 3 + i).toString()
);
acadyear.reverse();

const semester = ["3", "2", "1"];

// Default value
const ACADYEAR = (currentYear - 1).toString();
const SEMESTER = semester[0].toString();

const SearchBox = () => {
  const { fetchCourses } = useCourse();
  const [searchParams, setSearchParams] = useState({
    acadyear: ACADYEAR,
    semester: SEMESTER,
    coursecode: "",
    coursename: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    fetchCourses(searchParams);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto my-5">
        <div className="mx-5 overflow-hidden bg-white rounded-lg shadow-lg ">
          <div className="flex flex-col justify-center gap-6 px-6 py-4 md:items-center md:flex-row">
            {/* dropdowns */}
            <div className="flex gap-x-5">
              {/* acadyear */}
              <select
                name="acadyear"
                id="acadyear"
                onChange={handleSelectChange}
                className="p-2 px-4 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:outline-none focus:border-blue-400"
              >
                {acadyear.map((year) => {
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {/* semester */}
              <select
                name="semester"
                id="semester"
                onChange={handleSelectChange}
                className="p-2 px-4 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:outline-none focus:border-blue-400"
              >
                {semester.map((semester) => {
                  return (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* course code */}
            <input
              type="text"
              placeholder="Course Code..."
              name="coursecode"
              value={searchParams.coursecode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
            {/* course name */}
            <input
              type="text"
              placeholder="Course Name..."
              name="coursename"
              value={searchParams.coursename}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
            {/* btn */}
            <button
              disabled={!(searchParams.coursecode || searchParams.coursename)}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg disabled:opacity-50"
              onSubmit={handleSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBox;
