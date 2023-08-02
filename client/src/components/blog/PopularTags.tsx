import { useEffect, useState } from "react";
import { getTopTags } from "../../services/popular";
import { pastelColor } from "../../utils/colors";
import { Link } from "react-router-dom";

interface ITopTags {
  blogCount: number;
  name: string;
}

const PopularTags = () => {
  const [topTags, setTopTags] = useState<ITopTags[]>([]);
  // hide Navbar when current path is admin/*
  // const hidePopularTags = /^\/admin(\/|$) /.test(location.pathname);
  const hidePopularTags = /^\/admin(\/|$)|^\/blogs\/tag(\/|$)/.test(
    location.pathname
  );

  useEffect(() => {
    const fetchTopTags = async () => {
      const res = await getTopTags(); // default 5

      setTopTags(res.result);
    };

    fetchTopTags();
  }, []);

  return (
    <>
      {!hidePopularTags && (
        <div className="sticky z-auto flex-col items-center hidden mr-10 bottom-0-0 lg:flex">
          <div className="sticky w-56 p-6 bg-white rounded-lg shadow-lg top-24">
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {topTags.map((tp, i) => (
                <Link
                  to={`/blogs/tag/${tp.name}`}
                  key={i}
                  className="px-4 py-2 text-lg rounded-lg hover:opacity-80"
                  style={{
                    backgroundColor:
                      pastelColor[i % pastelColor.length].bgColor,
                    color: pastelColor[i % pastelColor.length].textColor,
                  }}
                >
                  #{tp.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopularTags;
