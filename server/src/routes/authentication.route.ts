import express from "express";
import {
  register,
  login,
  jwtRefreshToken,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "../controllers/authentication.controller";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/refresh-tokens", jwtRefreshToken);
  router.get("/auth/logout", logout);

  // current admin
  router.get("/auth/current-admin");

  //forgot password
  router.post("/forgot-password", forgotPassword);
  router.post("/verify-otp", verifyOTP);
  router.post("/reset-password", resetPassword);
};
