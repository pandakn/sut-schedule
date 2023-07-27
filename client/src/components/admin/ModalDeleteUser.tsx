import Modal from "../Modal";
import { FiTrash2 } from "react-icons/fi";

type ModalDeleteProps = {
  name?: string;
  isModalDeleteOpen: boolean;
  toggleModelDelete: () => void;
  handleDelete: () => void;
};

const ModalDeleteUser = ({
  name,
  isModalDeleteOpen,
  toggleModelDelete,
  handleDelete,
}: ModalDeleteProps) => {
  return (
    <Modal isOpenModal={isModalDeleteOpen}>
      <div className="p-6 text-center">
        <FiTrash2 size={56} className="w-full mb-2 text-red-500" />
        <h3 className="mb-5 text-lg font-normal text-gray-500">
          Are you sure you want to delete this user <br />
          <span className="font-extrabold text-gray-700">{name}</span>?
        </h3>
        <button
          onClick={handleDelete}
          type="button"
          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
        >
          Delete
        </button>
        <button
          onClick={toggleModelDelete}
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
