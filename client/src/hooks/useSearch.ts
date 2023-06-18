import { useState } from "react";
import { useCourse } from ".";

import { CourseSearchParamsInterface } from "../models/course.interface";

// acadyear
const currentYear = new Date().getFullYear() + 543;

const semester = ["1", "2", "3"];

// Default value
const ACADYEAR = (currentYear - 1).toString();
const SEMESTER = semester[0].toString();

export const useSearch = () => {
  const { fetchCourses } = useCourse();
  const [searchParams, setSearchParams] = useState<CourseSearchParamsInterface>(
    {
      acadyear: ACADYEAR,
      semester: SEMESTER,
      coursecode: "",
      coursename: "",
      cmd: "2",
      weekdays: "",
      timefrom: "",
      timeto: "",
    }
  );
  const [isShowFilter, setIsShowFilter] = useState(false);

  const toggleFilter = () => setIsShowFilter(!isShowFilter);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;

    if (name === "cmd") {
      setSearchParams({
        ...searchParams,
        [name]: event.target.checked ? "1" : "2",
      });
    } else {
      setSearchParams({
        ...searchParams,
        [name]: event.target.value,
      });
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsShowFilter(false);
    setSearchParams({
      ...searchParams,
      cmd: "2",
      weekdays: "",
      timefrom: "",
      timeto: "",
    });

    fetchCourses(searchParams);
  };

  return {
    searchParams,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    isShowFilter,
    toggleFilter,
    setIsShowFilter,
  };
};
