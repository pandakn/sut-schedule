import { useCallback, useEffect, useState } from "react";

// services
import { getBlogsOfUser } from "../../services/blog";

// component
import BlogCard from "../../components/blog/BlogCard";

// type
import { IBlog } from "./Blog";

// utils
import { formatDate } from "../../utils/formatDate";
import { useAuth } from "../../hooks";
import { Link } from "react-router-dom";
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const PostsOfUser = () => {
  const { accessToken, payload } = useAuth();
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchAllBlogs = useCallback(async () => {
    if (accessToken) {
      const res = await getBlogsOfUser(payload.id, accessToken);

      if (!res?.status) {
        const msg = res?.data.message;
        setErrorMsg(msg);
        return;
      }

      setBlogs(res?.data.result);
    }
  }, [accessToken, payload.id]);

  useEffect(() => {
    fetchAllBlogs();
  }, [fetchAllBlogs]);

  return (
    <>
      {errorMsg && (
        <div className="absolute space-y-6 text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <h3 className="text-3xl md:text-5xl">{errorMsg}</h3>
          <p className="">
            Start the post{" "}
            <Link className="text-blue-600 hover:underline" to="/editor">
              write now
            </Link>
          </p>
        </div>
      )}
      <div className="container px-5 mx-auto">
        <h3 className="mt-10 text-4xl ">Your Posts</h3>
        <div className="grid grid-cols-1 gap-6 mt-10 mb-20 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, idx) => {
            return (
              <BlogCard
                key={idx}
                slug={blog.slug}
                author={blog.author.name}
                title={blog.title}
                body={blog.body}
                cover={`${IMAGE_URL}/${blog.cover}`}
                tags={blog.tags}
                created={formatDate(blog.createdAt?.toString())}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PostsOfUser;
