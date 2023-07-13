import api from "./axiosInterceptors";
import { CourseDataInterface } from "../models/course.interface";
import { AxiosError } from "axios";
import { Role } from "../components/admin/@types/user";

const MAX_ROW = "50";

// ---------- user -----------
export const editUserProfile = async (
  token: string,
  userId: string,
  name: string,
  role?: Role,
  maximumStudyPlans?: number
) => {
  try {
    if (userId) {
      const response = await api.put(
        `/api/users/${userId}`,
        { name, role, maximumStudyPlans },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return { data: response.data, status: true };
      }
    }
  } catch (error) {
    console.log(error);

    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 400
    ) {
      return { status: false, data: error.response.data };
    } else {
      console.error(error);
    }
  }
};

export const updateUserProfile = async (
  token: string,
  userId: string,
  name: string,
  username?: string,
  password?: string
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
        return { data: response.data, status: true };
      }
    }
  } catch (error) {
    console.log(error);

    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 400
    ) {
      return { status: false, data: error.response.data };
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

export const deleteUserById = async (userId: string, token: string) => {
  try {
    if (userId) {
      const response = await api.delete(`/api/users/${userId}`, {
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

// -------- courses -----------
export const getCoursesData = async (
  acadyear: string,
  semester: string,
  coursecode: string,
  coursename: string,
  cmd: string,
  weekdays: string,
  timefrom: string,
  timeto: string
) => {
  const token = localStorage.getItem("accessToken");
  let url = `/api/courses?acadyear=${acadyear}&semester=${semester}&coursecode=${coursecode}&coursename=${coursename}&maxrow=${MAX_ROW}&cmd=${cmd}`;

  if (cmd === "1") {
    url += `&weekdays=${weekdays}&timefrom=${timefrom}&timeto=${timeto}`;
  }

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

// --------- study plan -----------
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
      return { status: true, data: response.data };
    } else {
      console.error(response.data);
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

export const editStudyPlan = async (
  studyPlanID: string,
  name: string,
  token: string
) => {
  try {
    if (studyPlanID) {
      const response = await api.put(
        `/api/study-plan/${studyPlanID}`,
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

export const reOrderOfCourseInStudyPlan = async (
  id: string,
  newSequence: CourseDataInterface[],
  token: string
) => {
  try {
    const response = await api.post(
      `/api/study-plan/${id}/courseSchedule/update-sequence`,
      { newSequence },
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
