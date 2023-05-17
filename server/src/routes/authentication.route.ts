import express from "express";
import { register, login } from "../controllers/authentication.controller";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
