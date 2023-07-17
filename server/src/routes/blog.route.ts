import express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blog.controller";

export default (router: express.Router) => {
  router.get("/blogs", getAllBlogs);
  router.get("/blogs/:id", authenticateToken, getBlogById);
  router.put("/blogs/:id", authenticateToken, updateBlog);
  router.delete("/blogs/:id", authenticateToken, deleteBlog);
};
