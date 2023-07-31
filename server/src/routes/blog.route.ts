import express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blog.controller";
import upload from "../middleware/upload";

export default (router: express.Router) => {
  router.get("/blogs", getAllBlogs);
  router.get("/blogs/:slug", getBlogById);
  router.put(
    "/blogs/:id",
    authenticateToken,
    upload.single("cover"),
    updateBlog
  );
  router.delete("/blogs/:id", authenticateToken, deleteBlog);
};
