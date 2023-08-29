import { Request, Response } from "express";
import connectRedis from "../utils/connect-redis";
import { scrapeCourseData } from "../scraping/scraper";
import { scrapeCourseDataTest } from "../scraping/scrapeTest";
import StudyPlan from "../models/studyPlan";

const redisClient = connectRedis();

export const getCourseDataTest = async (req: Request, res: Response) => {
  const {
    maxrow,
    acadyear,
    semester,
    coursecode,
    coursename,
    cmd,
    weekdays,
    timefrom,
    timeto,
  } = req.query as Record<string, string>;

  let url = `http://reg.sut.ac.th/registrar/class_info_1.asp?coursestatus=O00&facultyid=all&maxrow=${maxrow}&acadyear=${acadyear}&semester=${semester}&CAMPUSID=&LEVELID=&coursecode=${coursecode}&coursename=${coursename}&cmd=${cmd}`;

  // use filter course by day and time
  if (cmd === "1") {
    url += `&weekdays=${weekdays}&timefrom=${timefrom}&timeto=${timeto}`;
  }

  const cacheKey = `${coursecode}:${coursename}:${semester}:${acadyear}:${weekdays}:${timefrom}:${timeto}`;
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
      totalCourse: courseData.length,
      courseData,
    },
  };

  // expire 3 hr.
  await redisClient.set(cacheKey, JSON.stringify(jsonData), { EX: 3600 * 3 });
  res.json(jsonData);
};

export const getCourseDataFromREG = async (req: Request, res: Response) => {
  const {
    maxrow,
    acadyear,
    semester,
    coursecode,
    coursename,
    cmd = 2,
    weekdays,
    timefrom,
    timeto,
  } = req.query as Record<string, string>;

  let url = `http://reg.sut.ac.th/registrar/class_info_1.asp?coursestatus=O00&facultyid=all&maxrow=${maxrow}&acadyear=${acadyear}&semester=${semester}&CAMPUSID=&LEVELID=&coursecode=${coursecode}&coursename=${coursename}&cmd=${cmd}`;

  // use filter course by day and times
  if (cmd === "1") {
    url += `&weekdays=${weekdays}&timefrom=${timefrom}&timeto=${timeto}`;
  }

  const cacheKey = `${coursecode}:${coursename}:${semester}:${acadyear}:${
    weekdays || ""
  }:${timefrom || ""}:${timeto || ""}`;
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

export const getPopularCourses = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;

    // Use the aggregation pipeline to group and count the courses
    const popularCourses = await StudyPlan.aggregate([
      // Unwind the 'courseSchedule' array to create a separate document for each course
      { $unwind: "$courseSchedule" },
      // Group the documents by 'coursecode' and 'courseNameEN' and count the occurrences of each course
      {
        $group: {
          _id: {
            courseCode: "$courseSchedule.courseCode",
            courseName: "$courseSchedule.courseNameEN",
          },
          count: { $sum: 1 },
        },
      },
      // Project the fields to rename the _id field to 'course' and include the count field
      {
        $project: {
          _id: 0, // Exclude the default _id field
          courseCode: "$_id.courseCode",
          courseName: "$_id.courseName",
          count: 1,
        },
      },
      // Sort the courses in descending order based on their count (popularity)
      { $sort: { count: -1 } },
      { $limit: +limit || 5 },
    ]);

    res.status(200).json({ result: popularCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
