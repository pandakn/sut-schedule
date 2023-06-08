import api from "./axiosInterceptors";
import { CourseDataInterface } from "../models/course.interface";
import { AxiosError } from "axios";

const MAX_ROW = "50";

// edit profile

export const updateUserProfile = async (
  userId: string,
  name: string,
  username: string,
  password: string,
  token: string
) => {
  try {
    if (userId) {
      const response = await api.put(
        `/api/users/${userId}`,
        { name, username, password },
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
    }
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 400
    ) {
      return { status: false, data: error.response.data.error };
    } else {
      console.error(error);
    }
  }
};

export const getUserById = async (userId: string, token: string) => {
  try {
    if (userId) {
      const response = await api.get(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        console.error(response.data);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const getSelectStudyPlan = async (
  userID: string,
  studyPlanID: string,
  token: string
) => {
  try {
    if (studyPlanID) {
      const response = await api.post(
        `/api/users/${userID}/study-plan/${studyPlanID}`,
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
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteStudyPlan = async (
  userID: string,
  studyPlanID: string,
  token: string
) => {
  try {
    if (studyPlanID) {
      const response = await api.delete(
        `/api/users/${userID}/study-plan/${studyPlanID}`,
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
    }
  } catch (error) {
    console.error(error);
  }
};

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

export const getStudyPlanOfUser = async (userId: string, token: string) => {
  try {
    if (userId) {
      const response = await api.get(`/api/users/${userId}/study-plans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        console.error(response.data);
      }
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
    if (userID && studyPlanID) {
      const response = await api.post(
        `/api/users/${userID}/study-plans/${studyPlanID}`,
        { courseSchedule },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return { status: true, data: response.data };
      } else {
        console.error(response.data);
      }
    }
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 404
    ) {
      return { status: false, data: error.response.data };
    } else {
      console.error(error);
    }
  }
};

export const deleteCourseFromStudyPlan = async (
  userID: string,
  studyPlanID: string,
  courseID: string,
  token: string | null
) => {
  try {
    const response = await api.delete(
      `/api/users/${userID}/study-plans/${studyPlanID}/courses/${courseID}`,
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

export const addStudyPlan = async (
  userID: string,
  name: string,
  token: string | null
) => {
  try {
    const response = await api.post(
      `/api/users/${userID}/study-plans`,
      { name },
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
