import api from "./axiosInterceptors";
import { isTokenExpired } from "../utils/tokenExpired";

export async function refreshToken(): Promise<string | null> {
  try {
    const response = await api.get("/api/auth/refresh-tokens");
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
}

export function getAccessToken(): string | null {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken || isTokenExpired(accessToken)) {
    return null;
  }
  return accessToken;
}
