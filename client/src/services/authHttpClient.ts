import api from "./axiosInterceptors";
import { ILoginResponse } from "../models/auth.interface";
import { AxiosError } from "axios";

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
    }
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      (error.response.status === 400 || error.response.status === 404)
    ) {
      return { error: true, data: error.response.data };
    } else {
      console.error(error);
    }
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
    }
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 400
    ) {
      return { error: true, data: error.response.data };
    } else {
      console.error(error);
    }
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

export const forgotPassword = async (username: string, email: string) => {
  try {
    const response = await api.post(`/api/forgot-password`, {
      username,
      email,
    });

    if (response.status === 200) {
      // Handle the success response
      return { data: response.data, error: false };
    }
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      (error.response.status === 400 || error.response.status === 404)
    ) {
      return { error: true, data: error.response.data };
    } else {
      console.error(error);
    }
  }
};

export const verifyOTP = async (username: string, otp: string) => {
  try {
    const response = await api.post(`/api/verify-otp`, {
      username,
      otp,
    });

    if (response.status === 200) {
      // Handle the success response
      return { data: response.data, error: false };
    }
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      (error.response.status === 400 || error.response.status === 404)
    ) {
      return { error: true, data: error.response.data };
    } else {
      console.error(error);
    }
  }
};

export const resetPassword = async (username: string, newPassword: string) => {
  try {
    const response = await api.post(`/api/reset-password`, {
      username,
      newPassword,
    });

    if (response.status === 200) {
      // Handle the success response
      return { data: response.data, error: false };
    }
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      (error.response.status === 400 || error.response.status === 404)
    ) {
      return { error: true, data: error.response.data };
    } else {
      console.error(error);
    }
  }
};
