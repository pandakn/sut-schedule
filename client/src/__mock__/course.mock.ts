// const mappedCourses = useCallback(() => {
//   if (!Array.isArray(classSchedule)) {
//     return {};
//   }

//   const subjectColors: { [key: string]: IColor } = {};

//   const mappedSchedule: { [key: string]: Schedule[] } = {};

//   classSchedule.forEach((course) => {
//     course.classSchedule?.forEach((c) => {
//       const [start, end] = c.times.split("-");
//       const startCol = timeToCol(start);
//       const endCol = timeToCol(end);
//       const dayLowerCase = c.day.toLowerCase();

//       const subjectCode = course.courseCode;

//       let subjectColor = subjectColors[subjectCode];
//       if (!subjectColor) {
//         const { textColor, bgColor } = getRandomColor();
//         subjectColor = { textColor: textColor, bgColor: bgColor };
//         subjectColors[subjectCode] = subjectColor;
//       }

//       const mappedCourse: Schedule = {
//         id: course.id,
//         code: course.courseCode,
//         name: course.courseNameEN,
//         section: course.section,
//         day: c.day,
//         startCol,
//         endCol,
//         timeFrom: start,
//         timeTo: end,
//         textColor: subjectColor.textColor,
//         bgColor: subjectColor.bgColor,
//       };

//       if (dayLowerCase in mappedSchedule) {
//         mappedSchedule[dayLowerCase].push(mappedCourse);
//       } else {
//         mappedSchedule[dayLowerCase] = [mappedCourse];
//       }
//     });
//   });

//   return mappedSchedule;
// }, [classSchedule]);

// const groupedSchedule = sortedSchedule.reduce<Schedule[][]>(
//   (acc, curr) => {
//     const lastGroup = acc[acc.length - 1];
//     const currTimeFromCol = timeToCol(curr.timeFrom);

//     // console.log("currTimeFromCol", currTimeFromCol);
//     // console.log("curr", curr);

//     if (
//       lastGroup &&
//       lastGroup[lastGroup.length - 1].endCol >= currTimeFromCol
//     ) {
//       // Subjects collide or have adjacent columns
//       lastGroup.push(curr);
//     } else {
//       acc.push([curr]);
//     }
//     return acc;
//   },
//   []
// );

// CardOfSchedule component
// useEffect(() => {
//   const schedule = courseInSchedule[day];

//   if (schedule) {
//     const sortedSchedule = schedule.sort(
//       (a, b) => timeToCol(a.timeFrom) - timeToCol(b.timeFrom)
//     );

//     const groupedSchedule = sortedSchedule.reduce<Schedule[][]>(
//       (acc, curr) => {
//         const lastGroup = acc[acc.length - 1];
//         const currTimeFromCol = timeToCol(curr.timeFrom);

//         // console.log("currTimeFromCol", currTimeFromCol);
//         // console.log("curr", curr);

//         if (
//           lastGroup &&
//           lastGroup[lastGroup.length - 1].endCol >= currTimeFromCol
//         ) {
//           // Subjects collide or have adjacent columns
//           lastGroup.push(curr);
//         } else {
//           acc.push([curr]);
//         }
//         return acc;
//       },
//       []
//     );

//     // console.log("groupedSchedule", groupedSchedule);

//     setGroupCourses(sortedSchedule);
//   }
// }, [courseInSchedule, day, timeToCol]);

export const coursesMock = [
  {
    id: "16546c95-cfc4-41bc-818f-b0faffc92a9c",
    url: "http://reg.sut.ac.th/registrar/class_info_2.asp?backto=home&option=0&courseid=1009173&coursecode=523353&acadyear=2565&semester=3&avs269530573=16",
    courseCode: "523353",
    version: "2",
    courseNameEN: "COMPUTER NETWORKS",
    courseNameTH: "เครือข่ายคอมพิวเตอร์",
    faculty: "สำนักวิชาวิศวกรรมศาสตร์",
    department: "วิศวกรรมคอมพิวเตอร์",
    note: "สำหรับหลักสูตรปรับปรุง พ.ศ. 2560",
    professors: [
      "อาจารย์ ดร.ปริญญ์ ศรเลิศล้ำวาณิช",
      "นายคฑาเดช เขียนชัยนาจ",
      "นายกิตติภัฎ ศรีวงษ์",
    ],
    credit: "4 (3-3-9)",
    section: "2",
    status: "เปิดลงปกติ สามารถลงทะเบียนผ่าน WEB ได้",
    language: "TH ",
    degree: "ปริญญาตรี",
    classSchedule: [
      {
        day: "We",
        times: "09:00-12:00",
        room: "B1215",
      },
      {
        day: "Th",
        times: "13:00-16:00",
        room: "F11-422.Software",
      },
    ],
    seat: {
      totalSeat: "60",
      registered: "60",
      remain: "0",
    },
    details: {
      courseStatus: "ใช้งาน",
      courseCondition: ["523352"],
      continueCourse: null,
      equivalentCourse: null,
      midExam:
        "19 พ.ค. 2566 เวลา 09:00 - 11:00 อาคาร B ห้อง B1117 (สอบตามตารางมหาวิทยาลัย)  19 พ.ค. 2566 เวลา 09:00 - 11:00 อาคาร B ห้อง B1119 (สอบตามตารางมหาวิทยาลัย)",
      finalExam:
        "26 มิ.ย. 2566 เวลา 09:00 - 12:00 อาคาร B ห้อง N (สอบตามตารางมหาวิทยาลัย)",
    },
  },
  {
    id: "8f314e7a-2a4e-4509-b436-30d698bea7b5",
    url: "http://reg.sut.ac.th/registrar/class_info_2.asp?backto=home&option=0&courseid=1012991&coursecode=523423&acadyear=2565&semester=3&avs269530573=19",
    courseCode: "523423",
    version: "1",
    courseNameEN: "SOFTWARE TESTING",
    courseNameTH: "การทดสอบซอฟต์แวร์",
    faculty: "สำนักวิชาวิศวกรรมศาสตร์",
    department: "วิศวกรรมคอมพิวเตอร์",
    note: null,
    professors: ["อาจารย์ ดร.คมศัลล์ ศรีวิสุทธิ์"],
    credit: "4 (4-0-8)",
    section: "1",
    status: "เปิดลงปกติ สามารถลงทะเบียนผ่าน WEB ได้",
    language: "TH ",
    degree: "ปริญญาตรี",
    classSchedule: [
      {
        day: "Mo",
        times: "10:00-12:00",
        room: "B5202",
      },
      {
        day: "Tu",
        times: "10:00-12:00",
        room: "B1120",
      },
    ],
    seat: {
      totalSeat: "40",
      registered: "39",
      remain: "1",
    },
    details: {
      courseStatus: "ใช้งาน",
      courseCondition: ["523331", "523331"],
      continueCourse: null,
      equivalentCourse: null,
      midExam:
        "16 พ.ค. 2566 เวลา 12:00 - 14:00 อาคาร B ห้อง B1203 (สอบตามตารางมหาวิทยาลัย)",
      finalExam:
        "28 มิ.ย. 2566 เวลา 09:00 - 12:00 อาคาร B ห้อง N (สอบตามตารางมหาวิทยาลัย)",
    },
  },
  {
    id: "9888f1a7-ee34-4d7e-9918-e03632653e54",
    url: "http://reg.sut.ac.th/registrar/class_info_2.asp?backto=home&option=0&courseid=1009824&coursecode=523315&acadyear=2565&semester=3&avs269530692=12",
    courseCode: "523315",
    version: "1",
    courseNameEN: "MACHINE LEARNING FUNDAMENTALS",
    courseNameTH: "พื้นฐานการเรียนรู้ของเครื่อง",
    faculty: "สำนักวิชาวิศวกรรมศาสตร์",
    department: "วิศวกรรมคอมพิวเตอร์",
    note: "สำหรับหลักสูตรปรับปรุง พ.ศ. 2554 และ 2560",
    professors: [
      "รองศาสตราจารย์ ดร.กิตติศักดิ์ เกิดประสพ",
      "รองศาสตราจารย์ ดร.นิตยา เกิดประสพ",
    ],
    credit: "4 (4-0-8)",
    section: "1",
    status: "เปิดลงปกติ สามารถลงทะเบียนผ่าน WEB ได้",
    language: "TH ",
    degree: "ปริญญาตรี",
    classSchedule: [
      {
        day: "Mo",
        times: "13:00-15:00",
        room: "B1120",
      },
      {
        day: "We",
        times: "15:00-17:00",
        room: "B1127",
      },
    ],
    seat: {
      totalSeat: "44",
      registered: "44",
      remain: "0",
    },
    details: {
      courseStatus: "ใช้งาน",
      courseCondition: null,
      continueCourse: null,
      equivalentCourse: null,
      midExam: null,
      finalExam: null,
    },
  },
  {
    id: "3bc94cc6-418d-4ef6-b236-848fb654acd5",
    url: "http://reg.sut.ac.th/registrar/class_info_2.asp?backto=home&option=0&courseid=1011782&coursecode=IST301105&acadyear=2565&semester=3&avs269531021=12",
    courseCode: "IST30 1105",
    version: "1",
    courseNameEN: "ENGLISH FOR CAREERS",
    courseNameTH: "ภาษาอังกฤษเพื่อการทำงาน",
    faculty: "สำนักวิชาเทคโนโลยีสังคม",
    department: "ภาษาต่างประเทศ",
    note: null,
    professors: [
      "ผู้ช่วยศาสตราจารย์จินดาพร แสงกาญจนวนิช",
      "อาจารย์นิลวรรณ นิ้วประสิทธิ์",
    ],
    credit: "3 (3-0-6)",
    section: "12",
    status: "เปิดลงปกติ สามารถลงทะเบียนผ่าน WEB ได้",
    language: "TH ",
    degree: "ปริญญาตรี",
    classSchedule: [
      {
        day: "We",
        times: "13:00-15:00",
        room: "B1118",
      },
      {
        day: "Fr",
        times: "14:00-15:00",
        room: "B5202",
      },
    ],
    seat: {
      totalSeat: "41",
      registered: "41",
      remain: "0",
    },
    details: {
      courseStatus: "ใช้งาน",
      courseCondition: ["IST30 1104", "213204", "203204"],
      continueCourse: ["224359"],
      equivalentCourse: ["213305", "IST30 1105"],
      midExam: null,
      finalExam:
        "4 ก.ค. 2566 เวลา 09:00 - 12:00 อาคาร B ห้อง N (สอบตามตารางมหาวิทยาลัย)",
    },
  },
  {
    id: "55fde182-b96b-4ffa-8bc2-f69eb42ca065",
    url: "http://reg.sut.ac.th/registrar/class_info_2.asp?backto=home&option=0&courseid=1011789&coursecode=IST202503&acadyear=2565&semester=3&avs483317995=18",
    courseCode: "IST20 2503",
    version: "1",
    courseNameEN: "ASEAN STUDIES",
    courseNameTH: "อาเซียนศึกษา",
    faculty: "สำนักวิชาเทคโนโลยีสังคม",
    department: "ศึกษาทั่วไป",
    note: null,
    professors: [
      "อาจารย์ ดร.พรอนันต์ เอี่ยมขจรชัย",
      "อาจารย์ ดร.ปราโมทย์ ภักดีณรงค์",
      "อาจารย์ประจักษ์ แป๊ะสกุล",
      "นายจารุวัฒน์ นนทชัย",
    ],
    credit: "2 (2-0-4)",
    section: "1",
    status: "เปิดลงปกติ สามารถลงทะเบียนผ่าน WEB ได้",
    language: "TH ",
    degree: "ปริญญาตรี",
    classSchedule: [
      {
        day: "Th",
        times: "10:00-12:00",
        room: "B4101",
      },
    ],
    seat: {
      totalSeat: "1500",
      registered: "709",
      remain: "791",
    },
    details: {
      courseStatus: "ใช้งาน",
      courseCondition: null,
      continueCourse: null,
      equivalentCourse: ["IST20 2507", "202331", "IST20 2503"],
      midExam:
        "20 พ.ค. 2566 เวลา 15:00 - 17:00 อาคาร B ห้อง N (อาจารย์ผู้สอนจัดสอบเอง)",
      finalExam:
        "27 มิ.ย. 2566 เวลา 13:00 - 16:00 อาคาร B ห้อง N (สอบตามตารางมหาวิทยาลัย)",
    },
  },
];
