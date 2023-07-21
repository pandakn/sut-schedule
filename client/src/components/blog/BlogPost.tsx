import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import "./editor/editor.css";

import { getBlogById } from "../../services/blog";
import { useParams } from "react-router-dom";
import { IBlog } from "../../pages/blog/Blog";
import { formatDate } from "../../utils/formatDate";

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const BlogPost = () => {
  const { slug } = useParams();
  const { accessToken } = useAuth();
  const [post, setPost] = useState<Partial<IBlog>>({});

  const fetchBlogById = useCallback(async () => {
    if (accessToken) {
      const res = await getBlogById(slug, accessToken);

      setPost(res.result);
    }
  }, [accessToken, slug]);

  useEffect(() => {
    fetchBlogById();
  }, [fetchBlogById]);

  return (
    <div className="max-w-2xl px-5 mx-auto my-10">
      <div className="break-words">
        <header className="text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>
          <p className="text-gray-500">
            Published on {formatDate(post.createdAt?.toString())}
          </p>
        </header>
        <img
          src={`${IMAGE_URL}/${post.cover}`}
          alt="Blog Post"
          className="w-full my-6 rounded-lg"
        />
        <div className="mt-8">
          {post.body && (
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          )}
        </div>
        <section className="flex justify-start gap-2 mt-4">
          {post.tags?.map((t, idx) => (
            <p key={idx} className="px-2 py-1 text-gray-500 rounded bg-gray-50">
              #{t}
            </p>
          ))}
        </section>
      </div>
    </div>
  );
};

export default BlogPost;
