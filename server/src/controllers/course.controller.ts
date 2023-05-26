import { Request, Response } from "express";
import connectRedis from "../utils/connect-redis";
import { scrapeCourseData } from "../scraping/scraper";
import { scrapeCourseDataTest } from "../scraping/scrapeTest";
import User, { IUserModel } from "../models/user";

const redisClient = connectRedis();

export const getCourseDataTest = async (req: Request, res: Response) => {
  const { maxrow, acadyear, semester, coursecode, coursename } =
    req.query as Record<string, string>;

  // Use the query parameters to build the URL for the course data
  const url = `http://reg.sut.ac.th/registrar/class_info_1.asp?coursestatus=O00&facultyid=all&maxrow=${maxrow}&acadyear=${acadyear}&semester=${semester}&CAMPUSID=&LEVELID=&coursecode=${coursecode}&coursename=${coursename}&cmd=2`;

  const cacheKey = `${coursecode}:${coursename}:${semester}:${acadyear}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    res.send(JSON.parse(cachedData));
    return;
  }

  // Call the getCourseData function with the URL and return the data in the response
  const courseData = await scrapeCourseDataTest(url);

  if (!courseData) {
    res.status(404).json({ error: "No course data found" });
    return;
  }

  const jsonData = {
    result: {
      year: `${semester}/${acadyear}`,
      courseData,
    },
  };

  // expire 1 hr.
  await redisClient.set(cacheKey, JSON.stringify(jsonData), { EX: 3600 * 3 });
  res.json(jsonData);
};

export const getCourseDataFromREG = async (req: Request, res: Response) => {
  const { maxrow, acadyear, semester, coursecode, coursename } =
    req.query as Record<string, string>;

  // Use the query parameters to build the URL for the course data
  const url = `http://reg.sut.ac.th/registrar/class_info_1.asp?coursestatus=O00&facultyid=all&maxrow=${maxrow}&acadyear=${acadyear}&semester=${semester}&CAMPUSID=&LEVELID=&coursecode=${coursecode}&coursename=${coursename}&cmd=2`;

  const cacheKey = `${coursecode}:${coursename}:${semester}:${acadyear}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    res.send(JSON.parse(cachedData));
    return;
  }

  // Call the getCourseData function with the URL and return the data in the response
  const courseData = await scrapeCourseData(url);

  if (!courseData) {
    res.status(404).json({ error: "No course data found" });
    return;
  }

  const jsonData = {
    result: {
      year: `${semester}/${acadyear}`,
      countData: courseData.length,
      courseData,
    },
  };

  // expire 3 hr.
  await redisClient.set(cacheKey, JSON.stringify(jsonData), { EX: 3600 * 3 });
  res.json(jsonData);
};

export const addCourse = async (req: Request, res: Response): Promise<void> => {
  const { userId, course } = req.body;

  try {
    // Find the user by ID
    const user: IUserModel | null = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Add the course to the user's courses array
    user.courses.push(course);

    // Save the updated user document
    await user.save();

    res
      .status(200)
      .json({ message: "Course added to user successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  const { courseId } = req.params;

  try {
    // Find the user by ID
    const user: IUserModel | null = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if the user has the course in their courses array
    const courseIndex = user.courses.findIndex(
      (course) => course.id.toString() === courseId
    );
    if (courseIndex === -1) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    // Remove the course from the user's courses array
    user.courses.splice(courseIndex, 1);

    // Save the updated user document
    await user.save();

    res.status(201).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
