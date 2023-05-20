import { CourseDataInterface } from "../models/course.interface";

const MAX_ROW = "50";
const apiUrl = import.meta.env.VITE_API_URL;

export const register = async (
  name: string,
  username: string,
  password: string
) => {
  try {
    const response = await fetch(`${apiUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Handle the success response
      return { data, error: false };
    } else {
      // Handle the error response
      const data = await response.json();
      // console.error("error msg", dst);
      return { data, error: true };
    }
  } catch (error) {
    // Handle any network or server errors
    console.error(error);
  }
};

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
      return { data, error: false };
    } else {
      // Handle the error response
      const data = await response.json();
      // console.error("error msg", data);
      return { data, error: true };
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
  const token = localStorage.getItem("accessToken");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
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
  token: string | null
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

export const deleteCourseOfUser = async (
  userId: string,
  courseId: string,
  token: string | null
) => {
  try {
    const response = await fetch(`${apiUrl}/api/course/${courseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      const data = await response.json();
      // Handle the success response
      return data.message;
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

export const getCourseOfUser = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/api/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Handle the success response
      return data.result.courses;
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
