import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Blog from "../blog/Blog";

const ManageBlogs = () => {
  return (
    <div className="py-10">
      <div className="flex justify-end mr-5">
        <Button className="mb-8 text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white ">
          <Link to="/editor">Create Post</Link>
        </Button>
      </div>
      <Blog />
    </div>
  );
};

export default ManageBlogs;
