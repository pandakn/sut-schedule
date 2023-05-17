export interface IClassSchedule {
  day: string;
  times: string;
  room?: string;
}

export interface ISeat {
  totalSeat: string;
  registered: string;
  remain: string;
}

export interface ICourseDetails {
  courseStatus: string;
  courseCondition: string[] | null;
  continueCourse: string[] | null;
  equivalentCourse: string[] | null;
  midExam: string | null;
  finalExam: string | null;
}

export interface ICourse {
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
  classSchedule: IClassSchedule[] | null;
  seat: ISeat;
  details: ICourseDetails;
}
