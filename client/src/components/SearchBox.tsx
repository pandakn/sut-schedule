import React, { useState } from "react";
import { useCourse } from "../hooks";
import HowToSearch from "./HowToSearch";

// acadyear
const currentYear = new Date().getFullYear() + 543;
const acadyear = Array.from({ length: 4 }, (_, i) =>
  (currentYear - 3 + i).toString()
);
// acadyear.reverse();

const semester = ["1", "2", "3"];

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
    <>
      <HowToSearch isModalOpen={isModalOpen} toggleModal={toggleModal} />

      <form onSubmit={handleSubmit}>
        <div className="container mx-auto my-5">
          <div className="mx-5 overflow-hidden bg-white rounded-lg shadow-lg">
            <div className="flex flex-col justify-center gap-6 px-6 py-4 md:items-center md:flex-row">
              {/* dropdowns */}
              <div className="flex justify-center gap-x-5">
                {/* How to search */}
                <div
                  onClick={toggleModal}
                  className="flex items-center justify-center w-20 px-2 font-bold text-orange-500 bg-white border border-orange-500 rounded-md shadow-sm hover:cursor-pointer hover:bg-orange-500 hover:text-white"
                >
                  How to
                </div>

                {/* acadyear */}
                <select
                  name="acadyear"
                  id="acadyear"
                  onChange={handleSelectChange}
                  className="combobox-search"
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
                  className="combobox-search"
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
                className="input-search"
              />
              {/* course name */}
              <input
                type="text"
                placeholder="Course Name..."
                name="coursename"
                value={searchParams.coursename}
                onChange={handleInputChange}
                className="input-search"
              />
              {/* btn */}
              <button
                disabled={!(searchParams.coursecode || searchParams.coursename)}
                className="px-4 py-2 font-bold text-white bg-orange-500 rounded-lg disabled:opacity-50 hover:bg-orange-400"
                onSubmit={handleSubmit}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchBox;
