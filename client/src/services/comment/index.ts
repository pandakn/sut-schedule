import { AxiosError } from "axios";
import api from "../axiosInterceptors";

export const createComment = async (
  data: { author: string; blog: string | undefined; body: string },
  token: string
) => {
  try {
    const response = await api.post(
      `/api/comments`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

export const updateComment = async (
  id: string,
  data: { body: string },
  token: string
) => {
  try {
    const response = await api.put(
      `/api/comments/${id}`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

export const getCommentByBlogId = async (blogId: string) => {
  try {
    const response = await api.get(`/api/comments/${blogId}`);

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

export const deleteComment = async (id: string, token: string) => {
  try {
    const response = await api.delete(`/api/comments/${id}`, {
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
