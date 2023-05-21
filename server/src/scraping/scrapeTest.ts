import cheerio from "cheerio";
import axios from "axios";
import iconv from "iconv-lite";
import { v4 as uuidv4 } from "uuid";
import { scrapeCourseDetails } from "./course-detail";
import {
  ICourse,
  ICourseDetails,
  IClassSchedule,
  ISeat,
  IGroupedCourse,
  ISection,
} from "../interfaces/course.interface";

const statusObj: { [key: string]: string } = {
  A: "เพิ่มผ่าน WEB ได้เท่านั้น",
  C: "ปิดไม่รับลง",
  D: "ถอนผ่าน WEB ได้เท่านั้น",
  N: "เปิดลงปกติ ทำการโดยเจ้าหน้าที่เท่านั้น",
  W: "เปิดลงปกติ สามารถลงทะเบียนผ่าน WEB ได้",
  X: "เปลี่ยนกลุ่มผ่าน WEB ได้เท่านั้น",
};

// Group courses by course code and version
const groupedCourses = (courses: ICourse[]): IGroupedCourse[] => {
  const groupedCoursesMap = courses.reduce((acc, course) => {
    const key = `${course.courseCode}-${course.version}`;
    const { courseNameEN, courseNameTH, degree, department, faculty } = course;

    // acc stand for accumulator
    if (!acc[key]) {
      acc[key] = {
        courseCode: course.courseCode,
        version: course.version,
        courseNames: { en: courseNameEN, th: courseNameTH },
        credit: course.credit,
        degree,
        department,
        faculty,
        courseStatus: course.details.courseStatus,
        courseCondition: course.details.courseCondition,
        continueCourse: course.details.continueCourse,
        equivalentCourse: course.details.equivalentCourse,
        sectionsCount: 0,
        sections: [],
      };
    }

    // Check if the current section has already been added
    const sectionExists = acc[key].sections.some(
      (existingSection) => existingSection.section === course.section
    );

    // If the section does not exist yet, add it
    if (!sectionExists) {
      const section: ISection = {
        id: course.id,
        url: course.url,
        section: course.section,
        status: course.statusSection,
        note: course.note,
        professors: course.professors,
        language: course.language,
        seat: course.seat,
        classSchedule: course.classSchedule,
        exams: {
          midterm: course.details.midExam,
          final: course.details.finalExam,
        },
      };

      acc[key].sections.push(section);
    }

    // Update the totalSections property
    acc[key].sectionsCount = acc[key].sections.length;

    return acc;
  }, {} as { [key: string]: IGroupedCourse });

  return Object.values(groupedCoursesMap);
};

// extract time and day
const parseSchedule = (schedule: string): IClassSchedule[] => {
  const timeRegex = /\d{2}:\d{2}-\d{2}:\d{2}/g;
  const dayRegex = /Mo|Tu|We|Th|Fr|Sa|Su/g;

  const times = schedule.match(timeRegex);
  const days = schedule.match(dayRegex);

  if (times && days) {
    return times.map((time, i) => ({
      day: days[i],
      times: time,
    }));
  }

  return [];
};

const scrapeCourseDataTest = async (
  url: string
): Promise<IGroupedCourse[] | null> => {
  try {
    const response = await axios({
      url,
      responseType: "arraybuffer",
    });

    const data = iconv.decode(Buffer.from(response.data), "tis-620");
    const $ = cheerio.load(data);
    const courseData: ICourse[] = [];

    for (const [index, el] of $("table tr:nth-child(n+4)")
      .toArray()
      .entries()) {
      const rooms: string[] = [];

      if (
        $(el).text().includes("หน้าก่อน") ||
        $(el).text().includes("หน้าถัดไป")
      ) {
        console.log("Scrape Succeed!🚀");
        break;
      }

      // course
      // output -> IST30 1105 - 1
      const courseCodeStr = $(el).find("td:nth-child(2)").text().split("-");
      const courseCode = courseCodeStr[0];
      const version = courseCodeStr[1];

      const courseCodeUrl = $(el).find("td:nth-child(2) a").attr("href");

      const professorEl = $(el).find(
        "td:nth-child(3) font[color='#407060'] li"
      );

      const professors = professorEl.map((_, el) => $(el).text()).get();

      const noteStr = $(el)
        .find("td:nth-child(3) > font font[color='#660000']")
        .contents()
        .first()
        .text()
        .trim();
      // extract text in brackets
      const note =
        noteStr
          .substring(1, noteStr.length - 1)
          .trim()
          .replace(/\s+/g, " ") || null;

      // output -> 4 (3-2-8)
      const credit = $(el).find("td:nth-child(4)").text().trim();

      // Language
      // output -> EN : อังกฤษ
      const language = $(el)
        .find("td:nth-child(5)")
        .text()
        .trim()
        .split(":")[0];

      // degree
      const degree = $(el).find("td:nth-child(6)").text().trim();

      // rooms
      $(el)
        .find("td:nth-child(7) u")
        .each(function () {
          const room = $(this).text().trim();
          rooms.push(room);
        });

      // day, time, room
      const scheduleStr = $(el).find("td:nth-child(7) > font").text();
      const schedules = parseSchedule(scheduleStr);
      const classSchedule: IClassSchedule[] | null = schedules.map(
        (schedule, idx) => {
          return {
            ...schedule,
            room: rooms[idx],
          };
        }
      );

      // section
      const section = $(el).find("td:nth-child(8)").text().trim();

      // seat
      const totalSeat = $(el).find("td:nth-child(9)").text().trim();
      const registered = $(el).find("td:nth-child(10)").text().trim();
      const remain = $(el).find("td:nth-child(11)").text().trim();
      const seat: ISeat = {
        totalSeat,
        registered,
        remain,
      };

      // status
      const statusSectionCode = $(el).find("td:nth-child(12)").text().trim();
      const statusSection = statusObj[statusSectionCode];

      if (courseCode) {
        const uniqueId = uuidv4();

        // Check if the course details have already been scraped for the given course key

        const urlCourseDetails = `http://reg.sut.ac.th/registrar/${courseCodeUrl}`;
        const res = await scrapeCourseDetails(
          urlCourseDetails,
          Number(section)
        );

        // console.log(courseDetails);

        const {
          courseNameTH,
          courseNameEN,
          faculty,
          department,
          courseStatus,
          courseCondition,
          continueCourse,
          equivalentCourse,
          midExam,
          finalExam,
        } = res;

        const details: ICourseDetails = {
          courseStatus,
          courseCondition,
          continueCourse,
          equivalentCourse,
          midExam,
          finalExam,
        };

        const dataObj: ICourse = {
          id: uniqueId,
          url: urlCourseDetails,
          courseCode: courseCode.trim(),
          version: version.trim(),
          courseNameEN,
          courseNameTH,
          faculty,
          department,
          note,
          professors,
          credit,
          section,
          statusSection,
          language,
          degree,
          classSchedule: classSchedule.length < 1 ? null : classSchedule,
          seat,
          details,
        };
        courseData.push(dataObj);
      }
    }

    const result = groupedCourses(courseData);

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { scrapeCourseDataTest };
