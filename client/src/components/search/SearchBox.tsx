import { useState } from "react";

// components
import HowToSearch from "../HowToSearch";
import Filter from "./Filter";

// icons
import { VscSettings } from "react-icons/vsc";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useSearch } from "../../hooks/index";

// acadyear
const currentYear = new Date().getFullYear() + 543;
const acadyear = Array.from({ length: 4 }, (_, i) =>
  (currentYear - 3 + i).toString()
);
// acadyear.reverse(); d

const semester = ["1", "2", "3"];

const SearchBox = () => {
  const {
    searchParams,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    toggleFilter,
    isShowFilter,
    setIsShowFilter,
  } = useSearch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsShowFilter(false);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <HowToSearch isModalOpen={isModalOpen} toggleModal={toggleModal} />

      <form onSubmit={handleSubmit}>
        <div className="container mx-auto my-5">
          <div className="mx-5 overflow-hidden bg-white rounded-lg shadow-lg">
            <div className="flex flex-col justify-center gap-4 px-6 py-4 md:items-center md:flex-row">
              {/* dropdowns */}
              <div className="flex items-center justify-center gap-x-4">
                {/* How to search */}
                <div onClick={toggleModal} className="search-icon">
                  <AiOutlineFileSearch size={24} />
                </div>

                {/* filter */}
                <div>
                  <div className="search-icon" onClick={toggleFilter}>
                    <VscSettings size={24} />
                  </div>
                  {isShowFilter && (
                    <Filter
                      searchParams={searchParams}
                      handleSelectChange={handleSelectChange}
                      handleInputChange={handleInputChange}
                    />
                  )}
                </div>

                {/* acadyear */}
                <select
                  onFocus={() => setIsShowFilter(false)}
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
                  onFocus={() => setIsShowFilter(false)}
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
                onFocus={() => setIsShowFilter(false)}
                type="text"
                placeholder="Course Code..."
                name="coursecode"
                value={searchParams.coursecode}
                onChange={handleInputChange}
                className="input-search"
              />
              {/* course name */}
              <input
                onFocus={() => setIsShowFilter(false)}
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
