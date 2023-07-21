import { AxiosError } from "axios";
import api from "../axiosInterceptors";

export const createBlog = async (
  userId: string,
  data: FormData,
  token: string
) => {
  try {
    console.log(data);

    const response = await api.post(`/api/users/${userId}/blogs`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      return { status: true, data: response.data };
    }
  } catch (error: unknown) {
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

export const getBlogs = async (token: string) => {
  try {
    const response = await api.get(`/api/blogs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getBlogById = async (id: string | undefined, token: string) => {
  try {
    const response = await api.get(`/api/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
