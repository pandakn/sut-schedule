import { Request, Response } from "express";
import Tag, { ITag } from "../models/tag";

export const createTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const existingTag = await Tag.findOne({ name });

    if (existingTag) {
      return res.status(400).json({ message: "Tag already exists" });
    }

    const tag = new Tag({ name });

    const savedTag = await tag.save();

    res.status(200).json({ result: savedTag });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags: ITag[] = await Tag.find();

    res.status(200).json({ result: tags });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getPopularTags = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;

    // Aggregate pipeline to get popular tags based on the number of blogs associated with each tag
    const popularTags = await Tag.aggregate([
      {
        $lookup: {
          from: "blogs", // The name of the blogs collection in MongoDB
          localField: "blogs",
          foreignField: "_id",
          as: "blogData",
        },
      },
      {
        $project: {
          name: 1,
          blogCount: { $size: "$blogData" }, // Calculate the number of blogs associated with each tag
        },
      },
      {
        $sort: { blogCount: -1 }, // Sort the results based on the blog count in descending order
      },
      {
        $limit: +limit || 5, // Limit the results to the specified number of popular tags
      },
    ]);

    res.status(200).json({ result: popularTags });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
