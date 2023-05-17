import cheerio from "cheerio";
import axios from "axios";
import iconv from "iconv-lite";

const extractCourse = ($: cheerio.Root, selector: string): string[] => {
  const data: string[] = [];

  $(selector).each(function () {
    const result = $(this)
      .next("td")
      .find("a")
      .map((_, el) => $(el).text())
      .get();

    if (result.length) {
      data.push(...result);
    }
  });

  return data;
};

const extractExamAndRemark = (
  $: cheerio.Root,
  selector: string,
  sec: number
): string | null => {
  let data: string | null = null;

  $(selector).each(function (i, _) {
    const result = $(this).next("td").text().trim();

    if (result && i === sec) {
      data = result;
    }
  });

  return data;
};

const checkValueArray = (variable: string[]): string[] | null => {
  return variable.length < 1 ? null : variable;
};

const scrapeCourseDetails = async (courseCodeUrl: string, sec: number) => {
  try {
    const response = await axios({
      url: courseCodeUrl,
      responseType: "arraybuffer",
    });
    const data = iconv.decode(Buffer.from(response.data), "tis-620");
    const $ = cheerio.load(data);

    const courseInfoTable = $("table").first();
    const courseInfoRows = courseInfoTable.find("tr");

    const selector =
      "td:nth-child(3) > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody >";

    const courseNameEN = courseInfoRows
      .find(`${selector}tr:nth-child(1) > td:nth-child(2) > b > font`)
      .text()
      .replace(/\s+/g, " ")
      .trim();

    const courseNameTH = courseInfoRows
      .find(`${selector}tr:nth-child(2) > td:nth-child(2) > font`)
      .text()
      .replace(/\s+/g, " ")
      .trim();

    const facultyRaw = courseInfoRows
      .find(`${selector}tr:nth-child(3) > td:nth-child(3) > font`)
      .text()
      .trim()
      .split(", ");
    const faculty = facultyRaw[0];
    const department = facultyRaw[1];

    const courseStatus = courseInfoRows
      .find(`${selector} tr:nth-child(5) > td:nth-child(3) > font`)
      .text();

    // course condition, continue and equivalent
    const courseCondition = extractCourse($, 'td:contains("เงื่อนไขรายวิชา")');
    const continueCourse = extractCourse($, 'td:contains("รายวิชาต่อเนื่อง")');
    const equivalentCourse = extractCourse(
      $,
      'td:contains("รายวิชาเทียบเท่า")'
    );

    // exam
    const midExam = extractExamAndRemark($, 'td:contains("สอบกลางภาค")', sec);
    const finalExam = extractExamAndRemark(
      $,
      'td:contains("สอบประจำภาค")',
      sec
    );

    const courseData = {
      courseNameTH,
      courseNameEN,
      faculty,
      department,
      courseStatus,
      courseCondition: checkValueArray(courseCondition),
      continueCourse: checkValueArray(continueCourse),
      equivalentCourse: checkValueArray(equivalentCourse),
      midExam,
      finalExam,
    };

    return courseData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { scrapeCourseDetails };
