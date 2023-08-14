import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { toast } from "react-hot-toast";
import { Link, Navigate, useParams } from "react-router-dom";

// services
import { getBlogById, deleteBlog } from "../../services/blog";
import { createComment, getCommentByBlogId } from "../../services/comment";

// types
import { IBlog } from "./Blog";
import { IComment } from "../../components/blog/comment/@types";

// utils
import { formatDate } from "../../utils/formatDate";

// component
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CommentCard from "../../components/blog/comment/CommentCard";

// style
import "../../components/blog/editor/editor.css";

// icons
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Comment from "../../components/blog/comment/Comment";

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const BlogPost = () => {
  const { accessToken, payload } = useAuth();
  const { slug } = useParams();
  const [id, setId] = useState("");
  const [post, setPost] = useState<Partial<IBlog>>({});
  const [comments, setComments] = useState<IComment[]>([]);
  const [contentComment, setContentComment] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteBlog = async () => {
    if (id && accessToken) {
      await deleteBlog(id, accessToken);

      toast.success("Delete successfully", { duration: 1500 });

      setTimeout(() => {
        setRedirect(true);
      }, 1500);
    }
  };

  const fetchCommentsByBlogId = useCallback(async () => {
    if (id) {
      const res = await getCommentByBlogId(id);

      setComments(res?.data.result);
    }
  }, [id]);

  const fetchBlogBySlug = useCallback(async () => {
    const res = await getBlogById(slug);

    setPost(res.result);
  }, [slug]);

  useEffect(() => {
    fetchBlogBySlug();
    fetchCommentsByBlogId();
  }, [fetchBlogBySlug, fetchCommentsByBlogId]);

  useEffect(() => {
    if (payload.id === post.author?._id || payload.role === "admin") {
      setShowBtn(true);
    }
  }, [payload, post.author?._id]);

  const submitComment = async () => {
    setContentComment("");
    if (accessToken) {
      const data = { author: payload.id, blog: id, body: contentComment };
      const res = await createComment(data, accessToken);
      if (res) {
        setComments((prev) => {
          return [...prev, res?.data.result];
        });
        toast.success("Created comment");
      }
    }
  };

  useEffect(() => {
    const extractId = slug?.split("-");
    if (extractId) {
      const id = extractId[extractId?.length - 1];
      setId(id);
    }
  }, [slug]);

  if (redirect) {
    return <Navigate to={"/posts"} />;
  }

  return (
    <>
      <div className="max-w-2xl px-5 mx-auto my-10">
        <div className="break-words">
          <header className="text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              {post.title}
            </h1>
            <h2 className="mb-2 text-2xl">@{post.author?.name}</h2>
            <p className="text-gray-500">
              Published on {formatDate(post.createdAt?.toString())}
            </p>
            {showBtn && (
              <div className="flex justify-center mt-4 space-x-2">
                <Button className="font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  <Link
                    className="flex items-center gap-x-2"
                    to={`/edit-post/${slug}`}
                  >
                    <AiOutlineEdit className="w-5 h-5" />
                    Edit
                  </Link>
                </Button>
                <Button
                  className="flex font-bold text-white bg-red-500 rounded-lg gap-x-2 hover:bg-red-600"
                  onClick={toggleModal}
                >
                  <AiOutlineDelete className="w-5 h-5" />
                  Delete
                </Button>
              </div>
            )}
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
          <section className="flex justify-start gap-2 mt-8 mb-10">
            {post.tags?.map((t, idx) => (
              <Link
                to={`/blogs/tag/${t.name}`}
                key={idx}
                className="px-2 py-1 text-gray-500 rounded bg-gray-50"
              >
                #{t.name}
              </Link>
            ))}
          </section>
        </div>

        <hr className="my-8" />

        {/* comment */}
        {accessToken && (
          <Comment
            content={contentComment}
            setContent={setContentComment}
            submitComment={submitComment}
          />
        )}

        <div className="flex flex-col my-5 gap-y-4">
          {comments?.map((comment) => (
            <CommentCard
              key={comment._id}
              id={comment._id}
              author={comment.author}
              content={comment.body}
              created={formatDate(comment.createdAt?.toString())}
              setComments={setComments}
            />
          ))}
        </div>
      </div>

      <Modal isOpenModal={isModalOpen}>
        <div className="p-6 text-center">
          <FiTrash2 size={56} className="w-full mb-2 text-red-500" />
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            Are you sure you want to delete this post?
          </h3>
          <button
            onClick={handleDeleteBlog}
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Delete
          </button>
          <button
            onClick={toggleModal}
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BlogPost;
