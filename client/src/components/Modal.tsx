import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

type ModalProps = {
  children: React.ReactNode;
  title?: string;
  isOpenModal?: boolean;
  toggleModal?: () => void;
  showHeader?: boolean | false;
};

const Modal = ({
  isOpenModal,
  toggleModal,
  children,
  title,
  showHeader,
}: ModalProps) => {
  return (
    <div className="flex items-center justify-center">
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 overflow-x-hidden overflow-y-auto">
          <div className="relative w-auto mx-auto my-6">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  ease: "easeOut",
                  duration: 0.2,
                },
              }}
              className="relative z-20 text-gray-900 bg-white rounded-lg shadow-lg"
            >
              {showHeader && (
                <div className="flex items-center justify-between p-5 border-b border-gray-200">
                  <h2 className="text-2xl font-bold">{title}</h2>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={toggleModal}
                  >
                    <AiOutlineClose className="w-7 h-7" />
                  </button>
                </div>
              )}
              {children}
            </motion.div>
            <div
              className="fixed inset-0 z-10 bg-black/25"
              onClick={toggleModal}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
