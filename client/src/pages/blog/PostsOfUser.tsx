import { useCallback, useEffect, useState } from "react";

// services
import { getBlogsOfUser } from "../../services/blog";

// component
import BlogCard from "../../components/blog/BlogCard";

// type
import { IBlog, ITag } from "./Blog";

// utils
import { formatDate } from "../../utils/formatDate";
import { useAuth } from "../../hooks";
import { Link } from "react-router-dom";
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const PostsOfUser = () => {
  const { accessToken, payload } = useAuth();
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [selectedTag, setSelectedTag] = useState<ITag | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFilterTags = (tag: ITag) => {
    setSelectedTag(tag);
  };

  // Filter the blog posts by the selected tag
  const filteredPosts = selectedTag
    ? blogs.filter((post) => post.tags.find((t) => t.name === selectedTag.name))
    : blogs;

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
        <h3 className="mt-6 text-4xl lg:px-5">Your Posts</h3>
        {selectedTag && (
          <div className="flex items-center mt-10 ml-8 gap-x-2">
            <p className="px-2 py-1 text-2xl text-gray-500 rounded bg-gray-200/60">
              #{selectedTag.name}
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
                slug={blog.slug}
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

export default PostsOfUser;
