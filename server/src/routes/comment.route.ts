import express from "express";
import {
  getCommentsByBlog,
  updateComment,
  deleteComment,
  createComment,
} from "../controllers/comment.controller";
import { authenticateToken } from "../middleware/auth.middleware";

export default (router: express.Router) => {
  router.get("/comments/:blogId", getCommentsByBlog);
  router.post("/comments", authenticateToken, createComment);
  router.put("/comments/:commentId", authenticateToken, updateComment);
  router.delete("/comments/:commentId", authenticateToken, deleteComment);
};
