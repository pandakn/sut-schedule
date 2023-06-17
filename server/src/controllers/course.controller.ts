import { Request, Response } from "express";
import connectRedis from "../utils/connect-redis";
import { scrapeCourseData } from "../scraping/scraper";
import { scrapeCourseDataTest } from "../scraping/scrapeTest";

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
    url = `http://reg.sut.ac.th/registrar/class_info_1.asp?coursestatus=O00&facultyid=all&maxrow=${maxrow}&acadyear=${acadyear}&semester=${semester}&CAMPUSID=&LEVELID=&coursecode=${coursecode}&coursename=${coursename}&cmd=${cmd}&weekdays=${weekdays}&timefrom=${timefrom}&timeto=${timeto}`;
  }

  // Use the query parameters to build the URL for the course data

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
      totalCourse: courseData.length,
      courseData,
    },
  };

  // expire 1 hr.
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

  // use filter course by day and time
  if (cmd === "1") {
    url = `http://reg.sut.ac.th/registrar/class_info_1.asp?coursestatus=O00&facultyid=all&maxrow=${maxrow}&acadyear=${acadyear}&semester=${semester}&CAMPUSID=&LEVELID=&coursecode=${coursecode}&coursename=${coursename}&cmd=${cmd}&weekdays=${weekdays}&timefrom=${timefrom}&timeto=${timeto}`;
  }

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
