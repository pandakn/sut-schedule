import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { Link, Navigate, useParams } from "react-router-dom";

// services
import { getBlogById, deleteBlog } from "../../services/blog";

// page
import { IBlog } from "../../pages/blog/Blog";

// utils
import { formatDate } from "../../utils/formatDate";

// component
import Button from "../Button";
import Alert from "../Alert";
import Modal from "../Modal";

// style
import "./editor/editor.css";

// icons
import { FiTrash2 } from "react-icons/fi";
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const BlogPost = () => {
  const { accessToken, payload } = useAuth();
  const { slug } = useParams();
  const [post, setPost] = useState<Partial<IBlog>>({});
  const [showBtn, setShowBtn] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteBlog = async () => {
    setShowAlert(true);

    if (slug && accessToken) {
      await deleteBlog(slug, accessToken);

      setTimeout(() => {
        setShowAlert(false);
        setRedirect(true);
      }, 1500);
    }
  };

  const fetchBlogById = useCallback(async () => {
    const res = await getBlogById(slug);

    setPost(res.result);
  }, [slug]);

  useEffect(() => {
    fetchBlogById();
  }, [fetchBlogById]);

  useEffect(() => {
    if (payload.id === post.author?._id || payload.role === "admin") {
      setShowBtn(true);
    }
  }, [payload, post.author?._id]);

  if (redirect) {
    return <Navigate to={"/posts"} />;
  }

  return (
    <>
      {/* Alert */}
      {showAlert && (
        <Alert
          textColor="#166534"
          bgColor="#f0fdf4"
          icon={<AiOutlineCheckCircle className="text-xl" />}
        >
          Delete successfully
        </Alert>
      )}

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
              <p
                key={idx}
                className="px-2 py-1 text-gray-500 rounded bg-gray-50"
              >
                #{t}
              </p>
            ))}
          </section>
        </div>
        {showBtn && (
          <div className="flex justify-end mt-4 space-x-2">
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
