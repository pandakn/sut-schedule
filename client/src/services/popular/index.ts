import api from "../axiosInterceptors";

export const getTopTags = async (limit?: number) => {
  try {
    const response = await api.get(`/api/tags/popular?limit=${limit}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTopCourse = async (limit?: number) => {
  try {
    const response = await api.get(`/api/courses/popular?limit=${limit}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
