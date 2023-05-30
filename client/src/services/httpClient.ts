import api from "./axiosInterceptors";
import { CourseDataInterface } from "../models/course.interface";
import { AxiosError } from "axios";

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
  } catch (error: unknown) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 404
    ) {
      return { status: false, data: error.response.data.error };
    } else {
      console.error(error);
    }
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

export const addStudyPlan = async (
  userID: string,
  name: string,
  token: string | null
) => {
  try {
    const response = await api.post(
      `/api/study-plan`,
      { userID, name },
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

export const deleteStudyPlan = async (id: string, token: string | null) => {
  try {
    const response = await api.delete(`/api/study-plan/${id}`, {
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
