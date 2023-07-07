import api from "./axiosInterceptors";

export const getAllUsers = async (token: string) => {
  try {
    const response = await api.get(`/api/users`, {
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

export const getAllStudyPlans = async (token: string) => {
  try {
    const response = await api.get(`/api/study-plans`, {
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
