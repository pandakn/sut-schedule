import { useEffect, useState } from "react";
import { getTopTags } from "../../services/blog";
import { pastelColor } from "../../utils/colors";

interface ITopTags {
  blogCount: number;
  name: string;
}

const PopularTags = () => {
  const [topTags, setTopTags] = useState<ITopTags[]>([]);

  useEffect(() => {
    const fetchTopTags = async () => {
      const res = await getTopTags(); // default 5
      setTopTags(res.result);
    };

    fetchTopTags();
  }, []);

  return (
    <div className="sticky z-auto flex-col items-center hidden mr-10 bottom-0-0 lg:flex">
      <div className="sticky w-56 p-6 bg-white rounded-lg shadow-lg top-24">
        <h3 className="mb-4 text-2xl font-bold text-gray-800">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {topTags.map((tp, i) => (
            <div
              key={i}
              className="px-4 py-2 text-lg font-bold rounded-lg"
              style={{
                backgroundColor: pastelColor[i % pastelColor.length].bgColor,
                color: pastelColor[i % pastelColor.length].textColor,
              }}
            >
              #{tp.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularTags;
