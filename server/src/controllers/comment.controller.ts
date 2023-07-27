import { Request, Response } from "express";

import Comment, { IComment } from "../models/comment";
import User, { IUserModel } from "../models/user";
import Blog, { IBlog } from "../models/blog";

// Controller function to create a new comment
export const createComment = async (req: Request, res: Response) => {
  try {
    const { author, blog, body } = req.body;

    // Find the user by ID
    const user: IUserModel | null = await User.findById(author);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Find the blog by ID
    const blogDoc = await Blog.findById(blog);
    if (!blogDoc) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    // Create a new comment using the Comment model
    const comment: IComment = new Comment({
      author,
      blog,
      body,
    });

    // Save the comment to the database
    const savedComment: IComment = await comment.save();

    // Populate the 'author' field of the saved comment with the user details
    await savedComment.populate("author", "_id name username");

    // Append the new comment's ID to the 'comments' array of the blog
    blogDoc.comments.push(savedComment._id);

    // Save the updated blog to the database
    await blogDoc.save();

    res.status(200).json({ result: savedComment });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
// Controller function to get all comments for a specific blog
export const getCommentsByBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;

    const blog: IBlog | null = await Blog.findById(blogId);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    // Find all comments associated with the given blogId
    const comments: IComment[] = await Comment.find({ blog: blogId }).populate(
      "author",
      "username name"
    );

    res.status(200).json({ result: comments });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controller function to update a comment
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { body } = req.body;

    // Find the comment by ID and update its body
    const updatedComment: IComment | null = await Comment.findByIdAndUpdate(
      commentId,
      { body },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res
      .status(200)
      .json({ message: "updated successfully", result: updatedComment });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controller function to delete a comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    // Find the comment by ID and delete it
    const deletedComment: IComment | null = await Comment.findByIdAndDelete(
      commentId
    );

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Get the associated blog ID
    const blogId = deletedComment.blog;

    // Find the blog by ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Remove the comment ID from the 'comments' array of the blog
    blog.comments = blog.comments.filter(
      (comment) => comment.toString() !== commentId
    );

    // Save the updated blog to the database
    await blog.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
