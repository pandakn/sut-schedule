import api from "./axiosInterceptors";
import { ILoginResponse } from "../models/auth.interface";

export const register = async (
  name: string,
  username: string,
  password: string
) => {
  try {
    const response = await api.post(`/api/auth/register`, {
      name,
      username,
      password,
    });

    if (response.status === 200) {
      // Handle the success response
      return { data: response.data, error: false };
    } else {
      // Handle the error response
      return { data: response.data, error: true };
    }
  } catch (error) {
    // Handle any network or server errors
    console.error(error);
  }
};

export const login = async (
  username: string,
  password: string
): Promise<
  | {
      data: ILoginResponse;
      error: boolean;
    }
  | undefined
> => {
  try {
    const response = await api.post(`/api/auth/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      // Handle the success response
      return { data: response.data, error: false };
    } else {
      // Handle the error response
      return { data: response.data, error: true };
    }
  } catch (error) {
    // Handle any network or server errors
    console.error(error);
  }
};

export const getRefreshToken = async () => {
  try {
    const response = await api.get(`/api/auth/refresh-tokens`);

    if (response.status === 200) {
      // Handle the success response
      return { data: response.data, error: false };
    } else {
      // Handle the error response
      return { data: response.data, error: true };
    }
  } catch (error) {
    // Handle any network or server errors
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const response = await api.get(`/api/auth/logout`);

    if (response.status === 200) {
      // Handle the success response
      return { data: response.data, error: false };
    } else {
      // Handle the error response
      return { data: response.data, error: true };
    }
  } catch (error) {
    // Handle any network or server errors
    console.error(error);
  }
};
