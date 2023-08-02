import { Card, Title, BarChart, Subtitle } from "@tremor/react";
import { useEffect, useState } from "react";
import { getTopTags } from "../../services/popular";
import { ITag } from "../../pages/blog/Blog";

type ChartPopularTags = {
  name: string;
  "Number of post": number;
};

const BarChartPopularTags = () => {
  const [topTags, setTopTags] = useState<ChartPopularTags[]>([]);

  useEffect(() => {
    const fetchTopTags = async () => {
      const res = await getTopTags(); // default 5 tags
      const data = res.result;

      // Transform the data to match the expected format
      const formattedData = data.map((tag: ITag) => ({
        name: tag.name,
        [`${tag.name}`]: tag.blogCount,
      }));
      setTopTags(formattedData);
    };

    fetchTopTags();
  }, []);

  return (
    <Card className="my-10">
      <Title className="mb-2 font-bold text-orange-500 text-tremor-metric">
        Popular Tags
      </Title>
      <Subtitle>
        Explore the most popular tags based on the number of posts associated
        with each tag.
      </Subtitle>

      <BarChart
        className="mt-6"
        data={topTags}
        index="name"
        categories={topTags.map((tp) => tp.name)}
        colors={["blue", "teal", "amber", "rose", "indigo"]}
        yAxisWidth={40}
        stack={true}
      />
    </Card>
  );
};

export default BarChartPopularTags;
