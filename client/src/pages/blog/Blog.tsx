import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks";

// services
import { getBlogs } from "../../services/blog";

// component
import BlogCard from "../../components/blog/BlogCard";

// utils
import { formatDate } from "../../utils/formatDate";

export interface IBlog {
  _id: string;
  author: { username: string; name: string };
  cover: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const Blog = () => {
  const { accessToken } = useAuth();
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  const fetchAllBlogs = useCallback(async () => {
    if (accessToken) {
      const res = await getBlogs(accessToken);

      setBlogs(res.result);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchAllBlogs();
  }, [fetchAllBlogs]);

  return (
    <div className="container flex flex-col flex-wrap gap-6 px-5 mx-auto my-10 md:flex-row">
      {blogs.map((blog, idx) => {
        return (
          <BlogCard
            key={idx}
            id={blog._id}
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
  );
};

export default Blog;
