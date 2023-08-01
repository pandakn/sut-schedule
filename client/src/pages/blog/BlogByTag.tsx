import Blog from "./Blog";
import { useParams } from "react-router-dom";

const BlogByTag = () => {
  const { name } = useParams();

  return (
    <div className="container px-5 mx-auto">
      <div className="py-8 my-10 bg-white border-b-2">
        <h3 className="text-6xl tracking-wide text-center">#{name}</h3>
      </div>
      <Blog tag={name} />
    </div>
  );
};

export default BlogByTag;
