export interface IExam {
  midterm: string;
  final: string;
}

export interface ICourseNames {
  en: string;
  th: string;
}

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
  courseNameTH: string | null;
  faculty: string;
  department: string;
  note: string | null;
  professors: string[];
  credit: string;
  section: string;
  statusSection: string;
  language: string;
  degree: string;
  classSchedule: IClassSchedule[] | null;
  seat: ISeat;
  details: ICourseDetails;
}

export interface ISection {
  id: string;
  url: string;
  section: string;
  status: string;
  note: string | null;
  professors: string[];
  language: string;
  seat: ISeat;
  classSchedule: IClassSchedule[] | null;
  exams: IExam;
}

export interface IGroupedCourse {
  courseCode: string;
  version: string;
  courseNames: ICourseNames;
  credit: string;
  degree: string;
  department: string;
  faculty: string;
  courseStatus: string;
  courseCondition: string[] | null;
  continueCourse: string[] | null;
  equivalentCourse: string[] | null;
  sectionsCount: number;
  sections: ISection[];
}
