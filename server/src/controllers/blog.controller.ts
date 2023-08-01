import { Request, Response } from "express";
import fs from "fs";
import Blog, { IBlog } from "../models/blog";
import User, { IUserModel } from "../models/user";
import Tag, { ITag } from "../models/tag";
import { Types } from "mongoose";
import { titleToSlug } from "../utils/slug";

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const { tag } = req.query;
    let { sort } = req.query as Record<string, string>;

    // Convert sort to a number (if it is a string representing a number)
    const sortAsNumber = sort ? parseInt(sort as string, 10) : undefined;

    let blogs: IBlog[];

    if (tag) {
      // If the 'tag' query parameter is provided, find the tag document by name
      const tagDocument: ITag | null = await Tag.findOne({ name: tag }).exec();

      if (!tagDocument) {
        // If the tag document is not found, it means there are no blogs with this tag
        res.status(404).json({
          message: "Tag not found or no blogs associated with this tag.",
        });
        return;
      }

      // If the tag document is found, use its 'blogs' field to get the blogs with this tag
      blogs = await Blog.find({ _id: { $in: tagDocument.blogs } })
        .populate("author", "_id name username")
        .populate("comments")
        .populate("tags")
        .sort({ createdAt: sortAsNumber === 1 ? 1 : -1 }) // Sorting by createdAt field in ascending or descending order
        .exec();
    } else {
      // If no 'tag' query parameter is provided, get all blogs
      blogs = await Blog.find()
        .populate("author", "_id name username")
        .populate("comments")
        .populate("tags")
        .sort({ createdAt: sortAsNumber === 1 ? 1 : -1 }) // Sorting by createdAt field in ascending or descending order
        .exec();
    }

    if (blogs.length < 1) {
      res.status(404).json({ message: "No posts yet." });
      return;
    }

    res.status(200).json({ result: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getBlogOfUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  try {
    const blogs: IBlog[] | null = await Blog.find({ author: userId })
      .populate("author", "_id name username")
      .populate("comments")
      .populate("tags");

    if (blogs.length < 1) {
      res.status(404).json({ message: "No posts yet." });
      return;
    }

    res.status(200).json({ result: blogs });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getBlogById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { slug } = req.params;
  const extractId = slug?.split("-");
  const id = extractId[extractId?.length - 1];

  try {
    const blog: IBlog | null = await Blog.findOne({ _id: id })
      .populate("author", "_id name username")
      .populate("comments")
      .populate("tags");

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
  let { cover } = req.body;

  try {
    const existingBlog: IBlog | null = await Blog.findOne({ title });

    if (existingBlog) {
      res.status(400).json({ message: "Title must be unique" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: "Cover image must be provided" });
      return;
    }

    // Find the user by ID
    const user: IUserModel | null = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Generate the _id for the new blog
    const newBlogId = new Types.ObjectId().toHexString();

    const slug = `${titleToSlug(title)}-${newBlogId}`;

    // Update the cover image to use the filename from multer
    if (req.file) {
      cover = req.file.filename;
    }

    // Find or create tag documents based on the tag names
    const tagDocuments = await Promise.all(
      tags.map(async (tagName: string) => {
        const existingTag = await Tag.findOne({ name: tagName });

        if (existingTag) {
          return existingTag;
        }

        // If the tag doesn't exist, create a new tag
        const newTag: ITag = new Tag({
          name: tagName,
        });
        return newTag.save();
      })
    );

    // Create a new blog using the Blog model
    const newBlog: IBlog = new Blog({
      _id: newBlogId, // Assign the _id generated earlier
      author: userId,
      cover,
      title: title.trim(),
      body,
      tags: tagDocuments.map((tag) => tag._id), // Store only the tag IDs in the blog's tags array
      slug,
    });

    const savedBlog: IBlog = await newBlog.save();

    // Update the tag documents to include the newly created blog in their blogs array
    tagDocuments.forEach(async (tag) => {
      tag.blogs.push(savedBlog._id);
      await tag.save();
    });

    res
      .status(200)
      .json({ message: "Created successfully", result: savedBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  let { title, body, tags, cover, fileOld } = req.body;

  try {
    // const slug = `${title.trim().toLowerCase().replaceAll(" ", "-")}-${id}`;
    const slug = `${titleToSlug(title)}-${id}`;

    // Check if the new title is unique (excluding the current blog being updated)
    const existingBlog: IBlog | null = await Blog.findOne({
      title: { $regex: new RegExp("^" + title + "$", "i") },
      _id: { $ne: id },
    });

    if (existingBlog) {
      res.status(400).json({ message: "Title must be unique" });
      return;
    }

    // If there is a new uploaded file, update the cover and delete the old image
    if (req.file) {
      cover = req.file.filename;
      const imagePath = `public/images/${fileOld}`;
      fs.unlinkSync(imagePath);
    }

    // Convert the provided tag names into tag IDs
    const tagIds: string[] = [];
    for (const tagName of tags) {
      const tag: ITag | null = await Tag.findOne({ name: tagName });
      if (tag) {
        tagIds.push(tag._id);
      } else {
        // If the tag doesn't exist, create a new one and get its ID
        const newTag: ITag = new Tag({ name: tagName });
        const savedTag: ITag = await newTag.save();
        tagIds.push(savedTag._id);
      }
    }

    // Find the blog by ID and update its fields
    const updatedBlog: IBlog | null = await Blog.findByIdAndUpdate(
      id,
      { cover, title: title.trim(), body, tags: tagIds, slug },
      { new: true }
    );

    if (!updatedBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Updated successfully", result: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
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

    // Delete the associated image from the server's file system
    if (deletedBlog.cover) {
      const imagePath = `public/images/${deletedBlog.cover}`;
      fs.unlinkSync(imagePath);
    }

    // Remove the deleted blog's ID from the 'blogs' array of associated tags
    const tagsToUpdate: ITag[] = await Tag.find({ blogs: id });
    const updateOperations = tagsToUpdate.map((tag) => {
      tag.blogs = tag.blogs.filter((blogId) => blogId.toString() !== id);
      return tag.save();
    });

    await Promise.all(updateOperations);

    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
