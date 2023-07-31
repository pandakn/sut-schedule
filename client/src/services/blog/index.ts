import { AxiosError } from "axios";
import api from "../axiosInterceptors";

export const createBlog = async (
  userId: string,
  data: FormData,
  token: string
) => {
  try {
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
      (error.response.status === 404 || error.response.status === 400)
    ) {
      return { status: false, data: error.response.data };
    } else {
      console.error(error);
    }
  }
};

export const updateBlog = async (id: string, data: FormData, token: string) => {
  try {
    const response = await api.put(`/api/blogs/${id}`, data, {
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

export const getBlogs = async () => {
  try {
    const response = await api.get(`/api/blogs`);

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

export const getBlogsOfUser = async (userId: string, token: string) => {
  try {
    const response = await api.get(`/api/users/${userId}/blogs`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const getBlogById = async (slug: string | undefined) => {
  try {
    const response = await api.get(`/api/blogs/${slug}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteBlog = async (id: string, token: string) => {
  try {
    const response = await api.delete(`/api/blogs/${id}`, {
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

// tags
export const createTag = async (name: string, token: string) => {
  try {
    const response = await api.post(`/api/tags`, name, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const getTags = async () => {
  try {
    const response = await api.get(`/api/tags`);

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
