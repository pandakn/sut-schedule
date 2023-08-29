export interface CourseSearchParamsInterface {
  acadyear: string;
  semester: string;
  coursecode: string;
  coursename: string;
  cmd: string;
  weekdays: string;
  timefrom: string;
  timeto: string;
}

export interface ClassScheduleInterface {
  day: string;
  times: string;
  room?: string;
}

export interface SeatInterface {
  totalSeat: string;
  registered: string;
  remain: string;
}

export interface ExamInfo {
  date: string;
  month: string;
  times: string;
  yearStr: string;
  room: string;
}

export interface CourseDetailsInterface {
  courseStatus: string;
  courseCondition: string[] | null;
  continueCourse: string[] | null;
  equivalentCourse: string[] | null;
  midExam: ExamInfo | null;
  finalExam: ExamInfo | null;
}

export interface CourseDataInterface {
  id: string;
  url: string;
  courseCode: string;
  version: string;
  courseNameEN: string;
  courseNameTH: string;
  faculty: string;
  department: string;
  note: string | null;
  professors: string[];
  credit: string;
  section: string;
  status: string;
  language: string;
  degree: string;
  classSchedule: ClassScheduleInterface[] | null;
  seat: SeatInterface;
  details: CourseDetailsInterface;
}

export interface CourseInterface {
  year: string;
  courseData: CourseDataInterface[];
}

export interface IGroupedCourse {
  courseCode: string;
  version: string;
  courseNameEN: string;
  courseNameTH: string;
  credit: string;
  degree: string;
  department: string;
  faculty: string;
  courseStatus: string;
  courseCondition: string[] | null;
  continueCourse: string[] | null;
  equivalentCourse: string[] | null;
  sections: CourseDataInterface[];
}

export interface ICourseInSchedule {
  id: string;
  day: string;
  code: string;
  name: string;
  section: string;
  timeFrom: string;
  timeTo: string;
  startCol: number;
  endCol: number;
  textColor: string;
  bgColor: string;
}
