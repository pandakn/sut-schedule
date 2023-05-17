import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  editUser,
} from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";

export default (router: express.Router) => {
  router.get("/users", authenticateToken, getAllUsers);
  router.get("/user/:id", authenticateToken, getUserById);
  router.delete("/user/:id", authenticateToken, deleteUserById);
  router.put("/user/:id", authenticateToken, editUser);
};
