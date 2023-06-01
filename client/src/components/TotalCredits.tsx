import { CourseDataInterface } from "../models/course.interface";

type Props = {
  courseInPlanner: CourseDataInterface[];
};

const TotalCredits = ({ courseInPlanner }: Props) => {
  return (
    <div className="container mx-auto px-9 md:px-5 md:text-xl text-end">
      <p className="tracking-wide">
        total credit:{" "}
        <span className="ml-2">
          {courseInPlanner.reduce((sum, cs) => {
            if (cs && cs.credit) {
              return sum + parseInt(cs.credit.split(" ")[0]);
            }
            return sum;
          }, 0)}
        </span>{" "}
        {courseInPlanner.reduce((sum, cs) => {
          if (cs && cs.credit) {
            return sum + parseInt(cs.credit.split(" ")[0]);
          }
          return sum;
        }, 0) > 1
          ? "credits"
          : "credit"}
      </p>
    </div>
  );
};

export default TotalCredits;
