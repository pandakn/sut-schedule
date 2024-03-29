import { AxiosError } from "axios";
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

// logo
export const createConfigSetting = async (data: FormData, token: string) => {
  try {
    const response = await api.post(`/api/config-setting`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      return { status: true, data: response.data };
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

export const getConfigSetting = async () => {
  try {
    const response = await api.get(`/api/config-setting`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};
