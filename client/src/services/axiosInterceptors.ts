import axios from "axios";
import { getAccessToken, refreshToken } from "./getToken";
import { logout } from "./authHttpClient";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // This is required to send cookies with the request
});

api.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/api/auth/refresh-tokens"
    ) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } else {
        await logout();
        localStorage.clear();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
