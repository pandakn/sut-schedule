import { Card, Title, BarChart, Subtitle } from "@tremor/react";
import { useEffect, useState } from "react";
import { getTopCourse } from "../../services/popular";

interface IPopularCourse {
  courseCode: string;
  courseName: string;
  count: number;
}

type ChartPopularCourses = {
  name: string;
  "Number of post": number;
};

const BarChartPopularCourses = () => {
  const [topCourses, setTopCourses] = useState<ChartPopularCourses[]>([]);

  useEffect(() => {
    const fetchTopCourses = async () => {
      const res = await getTopCourse(); // default 5 courses
      const data = res.result;

      // Transform the data to match the expected format
      const formattedData = data.map((data: IPopularCourse) => ({
        name: data.courseName,
        [`${data.courseName}`]: data.count,
      }));
      setTopCourses(formattedData);
    };

    fetchTopCourses();
  }, []);

  return (
    <Card className="my-10">
      <Title className="mb-2 font-bold text-orange-500 text-tremor-metric">
        Popular Courses
      </Title>
      <Subtitle>Explore the most popular courses.</Subtitle>

      <BarChart
        className="mt-6"
        data={topCourses}
        index="name"
        categories={topCourses.map((tc) => tc.name)}
        colors={["blue", "teal", "amber", "rose", "indigo"]}
        yAxisWidth={40}
        stack={true}
      />
    </Card>
  );
};

export default BarChartPopularCourses;
