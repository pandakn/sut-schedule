import { SetStateAction, useEffect, useState } from "react";
import { useAuth } from "../../../hooks";
import { motion } from "framer-motion";

// icons
import { AiOutlineMore, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Modal from "../../Modal";
import { FiTrash2 } from "react-icons/fi";
import EditComment from "./EditComment";
import { updateComment } from "../../../services/comment";
import toast from "react-hot-toast";
import { IComment } from "./@types";

type CommentCardProps = {
  id: string;
  author: { _id: string; username: string; name: string };
  content: string;
  created: string | undefined;
  handleDeleteComment: (id: string) => Promise<void>;
  setComments: React.Dispatch<SetStateAction<IComment[]>>;
};

const CommentCard = ({
  id,
  author,
  content,
  created,
  handleDeleteComment,
  setComments,
}: CommentCardProps) => {
  const { payload, accessToken } = useAuth();
  const [showBtn, setShowBtn] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const toggleModalDelete = () => {
    setIsModalOpenDelete(!isModalOpenDelete);
  };

  const toggleModalEdit = () => {
    setIsModalOpenEdit(!isModalOpenEdit);
  };

  const toggleMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  const handleEditComment = async (body: string) => {
    if (accessToken) {
      const res = await updateComment(id, body, accessToken);
      const data = res?.data.result;

      setComments((prev) => {
        const updated = prev.map((cm) =>
          cm._id === data._id ? { ...cm, body } : cm
        );
        return updated;
      });

      res && toast.success("Update successfully", { duration: 1000 });
      setTimeout(() => {
        setIsModalOpenEdit(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (payload.id === author?._id || payload.role === "admin") {
      setShowBtn(true);
    }
  }, [author?._id, payload]);

  return (
    <div className="relative p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <div>
          <h3 className="text-lg font-bold">
            f @{author.name}
            <span className="mx-2 ">·</span>
            <span className="font-medium text-gray-400">{created}</span>
          </h3>
        </div>
        {showBtn && (
          <button onClick={toggleMenu} className="absolute right-5">
            <AiOutlineMore className="w-5 h-5" />
          </button>
        )}
        {isShowMenu && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            // onClick={toggleMenu}
            className="absolute p-1 px-2 bg-white border rounded-md -right-2 w-fit top-14 lg:-right-4"
          >
            <div className="flex gap-x-2">
              <div
                className="text-blue-600 hover:text-blue-800 hover:cursor-pointer"
                onClick={toggleModalEdit}
              >
                <AiOutlineEdit className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              |
              <p
                onClick={toggleModalDelete}
                className="text-red-600 hover:text-red-800 hover:cursor-pointer"
              >
                <AiOutlineDelete className="w-5 h-5 lg:w-7 lg:h-7" />
              </p>
            </div>
          </motion.div>
        )}
        <Modal isOpenModal={isModalOpenDelete}>
          <div className="p-6 text-center">
            <FiTrash2 size={56} className="w-full mb-2 text-red-500" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete this comment?
            </h3>
            <button
              onClick={() => handleDeleteComment(id)}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Delete
            </button>
            <button
              onClick={toggleModalDelete}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {/* Edit comment */}
      <Modal isOpenModal={isModalOpenEdit}>
        <EditComment
          body={content}
          toggleModal={toggleModalEdit}
          handleEditComment={handleEditComment}
        />
      </Modal>
    </div>
  );
};

export default CommentCard;
