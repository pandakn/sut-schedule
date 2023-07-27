import { useCallback, useEffect, useState } from "react";

// services
import { getBlogs } from "../../services/blog";

// component
import BlogCard from "../../components/blog/BlogCard";

// utils
import { formatDate } from "../../utils/formatDate";

export interface IBlog {
  _id: string;
  author: { _id: string; username: string; name: string };
  cover: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const Blog = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFilterTags = (tag: string) => {
    setSelectedTag(tag);
  };

  // Filter the blog posts by the selected tag
  const filteredPosts = selectedTag
    ? blogs.filter((post) => post.tags.includes(selectedTag))
    : blogs;

  const fetchAllBlogs = useCallback(async () => {
    const res = await getBlogs();

    if (!res?.status) {
      const msg = res?.data.message;
      setErrorMsg(msg);
      return;
    }

    setBlogs(res?.data.result);
  }, []);

  useEffect(() => {
    fetchAllBlogs();
  }, [fetchAllBlogs]);

  return (
    <>
      {errorMsg && (
        <div className="absolute space-y-6 text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <h3 className="text-3xl md:text-5xl">{errorMsg}</h3>
        </div>
      )}
      <div className="container px-5 mx-auto">
        {selectedTag && (
          <div className="flex items-center mt-10 ml-8 gap-x-2">
            <p className="px-2 py-1 text-2xl text-gray-500 rounded bg-gray-200/60">
              #{selectedTag}
            </p>
            <button
              className="text-xl text-red-500"
              onClick={() => setSelectedTag(null)}
            >
              X
            </button>
          </div>
        )}
        <div className="flex flex-col flex-wrap gap-6 my-10 md:flex-row">
          {filteredPosts.map((blog, idx) => {
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
                handleFilterTags={handleFilterTags}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Blog;
