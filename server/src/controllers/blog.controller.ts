import { Request, Response } from "express";
import Blog, { IBlog } from "../models/blog";
import User, { IUserModel } from "../models/user";

export const getAllBlogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blogs: IBlog[] = await Blog.find().populate(
      "creator",
      "name username"
    );
    res.status(200).json({ result: blogs });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getBlogById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const blog: IBlog | null = await Blog.findById(id).populate(
      "creator",
      "name username"
    );
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ result: blog });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const { title, body, tags } = req.body;
  try {
    // Find the user by ID
    const user: IUserModel | null = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const newBlog: IBlog = new Blog({
      creator: userId,
      title,
      body,
      tags,
    });

    const savedBlog: IBlog = await newBlog.save();

    res
      .status(200)
      .json({ message: "created successfully", result: savedBlog });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, body, tags } = req.body;
  try {
    const updatedBlog: IBlog | null = await Blog.findByIdAndUpdate(
      id,
      { title, body, tags },
      { new: true }
    );
    if (!updatedBlog) {
      res.status(404).json({ message: "Blog not found" });
    }

    res
      .status(200)
      .json({ message: "updated successfully", result: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedBlog: IBlog | null = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
