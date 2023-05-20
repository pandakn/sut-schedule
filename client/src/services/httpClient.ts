import { CourseDataInterface } from "../models/course.interface";

const MAX_ROW = "50";
const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Handle the success response
      return data;
    } else {
      // Handle the error response
      const errorData = await response.json();
      console.error(errorData);
    }
  } catch (error) {
    // Handle any network or server errors
    console.error(error);
  }
};

export const getCoursesData = async (
  acadyear: string,
  semester: string,
  coursecode: string,
  coursename: string
) => {
  const url = `${apiUrl}/api/courses?acadyear=${acadyear}&semester=${semester}&coursecode=${coursecode}&coursename=${coursename}&maxrow=${MAX_ROW}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.result) {
    return { status: true, data: data.result };
  } else {
    return { status: false, data: data.error };
  }
};

export const addCourseData = async (
  userId: string,
  course: CourseDataInterface,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, course }),
    });

    if (response.ok) {
      const data = await response.json();
      // Handle the success response
      return data;
    } else {
      // Handle the error response
      const errorData = await response.json();
      console.error(errorData);
    }
  } catch (error) {
    // Handle any network or server errors
    console.error(error);
  }
};
