import express from "express";
import {
  register,
  login,
  jwtRefreshToken,
} from "../controllers/authentication.controller";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/refresh-tokens", jwtRefreshToken);
};
