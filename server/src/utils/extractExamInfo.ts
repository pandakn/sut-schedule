import { ExamInfo } from "interfaces/course.interface";

const MONTH_ABBREVIATIONS: Record<string, string> = {
  "ม.ค.": "Jan",
  "ก.พ.": "Feb",
  "มี.ค.": "Mar",
  "เม.ย.": "Apr",
  "พ.ค.": "May",
  "มิ.ย.": "Jun",
  "ก.ค.": "Jul",
  "ส.ค.": "Aug",
  "ก.ย.": "Sep",
  "ต.ค.": "Oct",
  "พ.ย.": "Nov",
  "ธ.ค.": "Dec",
};

const convertMonthAbbreviation = (thaiMonth: string): string => {
  return MONTH_ABBREVIATIONS[thaiMonth];
};

const cleanString = (text: string): string => {
  return text.replace(/\s+/g, "");
};

// Function to extract date, month, and times from each pair
export const extractExamInfo = (rawText: string): ExamInfo => {
  if (!rawText) return null;

  const [datePart, timePart] = rawText.split("เวลา");

  const timeRangePattern = /^\d{2}:\d{2}\s*-\s*\d{2}:\d{2}/;
  const timeReplaceWhiteSpace = timePart.replace(" ", "");

  const extractedTimeRange = timeReplaceWhiteSpace.match(timeRangePattern)[0];

  const extractedRoom = timeReplaceWhiteSpace.split(timeRangePattern)[1].trim();

  // Remove white spaces from the extracted time range
  const cleanedTimeRange = cleanString(extractedTimeRange);

  const [dateStr, monthStr, yearStr] = datePart.trim().split(" ");
  const date: string = dateStr.padStart(2, "0");
  const month: string = convertMonthAbbreviation(monthStr);

  return { date, month, times: cleanedTimeRange, yearStr, room: extractedRoom };
};
