type ExtractExam = {
  date: string;
  month: string;
  times: string;
  yearStr: string;
};

// Function to convert Thai month abbreviation to English month abbreviation
const convertMonthAbbreviation = (thaiMonth: string): string => {
  const months: Record<string, string> = {
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
  return months[thaiMonth];
};

// Function to extract date, month, and times from each pair
export const extractExamInfo = (pair: string): ExtractExam => {
  const [datePart, timePart] = pair.split("เวลา");

  const [dateStr, monthStr, yearStr] = datePart.trim().split(" ");
  const date: string = dateStr.padStart(2, "0");
  const month: string = convertMonthAbbreviation(monthStr);

  const times = timePart.replaceAll(" ", "");

  return { date, month, times, yearStr };
};
