import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { ICourse } from "interfaces/course.interface";

export interface IStudyPlanModel extends Document {
  creator: ObjectId;
  name: string;
  courseSchedule: ICourse[];
  createdAt: Date;
  updatedAt: Date;
}

const scheduleSchema: Schema = new mongoose.Schema({
  day: {
    type: String,
  },
  times: {
    type: String,
  },
  room: {
    type: String,
  },
});

const courseSchema: Schema = new mongoose.Schema({
  id: {
    type: String,
  },
  url: {
    type: String,
  },
  courseCode: {
    type: String,
  },
  version: {
    type: String,
  },
  courseNameEN: {
    type: String,
  },
  courseNameTH: {
    type: String,
    default: null,
  },
  faculty: {
    type: String,
  },
  department: {
    type: String,
  },
  note: {
    type: String,
    default: null,
  },
  professors: {
    type: [String],
  },
  credit: {
    type: String,
  },
  section: {
    type: String,
  },
  statusSection: {
    type: String,
  },
  language: {
    type: String,
  },
  degree: {
    type: String,
  },
  classSchedule: {
    type: [scheduleSchema],
    default: null,
  },
  seat: {
    type: Object,
    properties: {
      totalSeat: {
        type: String,
      },
      registered: {
        type: String,
      },
      remain: {
        type: String,
      },
    },
  },
  details: {
    type: Object,
    properties: {
      courseStatus: {
        type: String,
      },
      courseCondition: {
        type: [String],
        default: null,
      },
      continueCourse: {
        type: [String],
        default: null,
      },
      equivalentCourse: {
        type: String,
        default: null,
      },
      midExam: {
        type: String,
        default: null,
      },
      finalExam: {
        type: String,
        default: null,
      },
    },
  },
});

const courseScheduleSchema: Schema = new mongoose.Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    courseSchedule: {
      type: [courseSchema],
    },
  },
  { timestamps: true }
);

const StudyPlan = mongoose.model<IStudyPlanModel>(
  "StudyPlan",
  courseScheduleSchema
);

export default StudyPlan;
