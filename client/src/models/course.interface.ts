export interface CourseSearchParamsInterface {
  acadyear: string;
  semester: string;
  coursecode: string;
  coursename: string;
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

export interface CourseDetailsInterface {
  courseStatus: string;
  courseCondition: string[] | null;
  continueCourse: string[] | null;
  equivalentCourse: string[] | null;
  midExam: string | null;
  finalExam: string | null;
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
