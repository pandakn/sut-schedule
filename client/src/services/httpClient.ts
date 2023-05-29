import api from "./axiosInterceptors";
import { CourseDataInterface } from "../models/course.interface";

const MAX_ROW = "50";

export const getCoursesData = async (
  acadyear: string,
  semester: string,
  coursecode: string,
  coursename: string
) => {
  const url = `/api/courses?acadyear=${acadyear}&semester=${semester}&coursecode=${coursecode}&coursename=${coursename}&maxrow=${MAX_ROW}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && response.data.result) {
      return { status: true, data: response.data.result };
    } else {
      return { status: false, data: response.data.error };
    }
  } catch (error) {
    console.error(error);
  }
};

export const addCourseData = async (
  userId: string,
  course: CourseDataInterface,
  token: string | null
) => {
  try {
    const response = await api.post(
      `/api/courses`,
      {
        userId,
        course,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteCourseOfUser = async (
  userId: string,
  courseId: string,
  token: string | null
) => {
  try {
    const response = await api.delete(`/api/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { userId },
    });

    if (response.status === 200) {
      return response.data.message;
    } else {
      console.error(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCourseOfUser = async (userId: string, token: string) => {
  try {
    const response = await api.get(`/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.result.courses;
    } else {
      console.error(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getStudyPlanOfUser = async (userId: string, token: string) => {
  try {
    const response = await api.get(`/api/user/study-plan/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const addCourseToStudyPlan = async (
  userID: string,
  studyPlanID: string,
  courseSchedule: CourseDataInterface,
  token: string | null
) => {
  try {
    const response = await api.post(
      `/api/user/study-plan/${userID}`,
      { studyPlanID, courseSchedule },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteCourseFromStudyPlan = async (
  userID: string,
  studyPlanID: string,
  courseID: string,
  token: string | null
) => {
  try {
    const response = await api.delete(`/api/user/study-plan/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { studyPlanID, courseID },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};
