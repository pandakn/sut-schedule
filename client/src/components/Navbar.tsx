import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// components
import Modal from "./Modal";
import EditProfile from "./EditProfile";

// icons
import { MdLogout } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const { accessToken, payload, handleLogout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShowEditProfile, setIsShowEditProfile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleProfile = () => setIsShowEditProfile(!isShowEditProfile);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav className="bg-white shadow-lg sticky-navbar">
      <div className="container px-5 mx-auto">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center justify-between w-full ">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl uppercase">
                <span className="text-orange-500">Sut</span> Schedule
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-6">
                {accessToken ? (
                  <>
                    <Link
                      className="text-gray-600 capitalize hover:text-gray-800"
                      to="search-course"
                    >
                      Search Course
                    </Link>
                    |
                    <div className="relative">
                      <h3
                        className="hover:cursor-pointer hover:opacity-60 "
                        onClick={toggleProfile}
                      >
                        <span className="mr-1 text-orange-500">Hey,</span>
                        {payload.name}
                      </h3>

                      {isShowEditProfile && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          onClick={toggleProfile}
                          className="absolute p-1 px-2 bg-white border border-gray-400 rounded-lg hover:cursor-pointer hover:bg-white/50 w-28 -left-2 top-8"
                        >
                          <div
                            className="text-gray-600 capitalize hover:text-gray-800"
                            onClick={toggleModal}
                          >
                            Edit Profile
                          </div>
                        </motion.div>
                      )}
                    </div>
                    <MdLogout
                      onClick={handleLogout}
                      className="text-red-400 w-7 h-7 hover:text-red-600 hover:cursor-pointer"
                    />
                  </>
                ) : (
                  <Link
                    className="text-gray-600 capitalize hover:text-gray-800"
                    to="login"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex -mr-2 md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 text-orange-400 bg-gray-100 rounded-md hover:text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-800 focus:ring-white"
            >
              {!isMenuOpen ? (
                <AiOutlineMenu className="w-5 h-5" />
              ) : (
                <AiOutlineClose className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container flex flex-col px-5 pb-8 mx-auto gap-y-2">
            {accessToken ? (
              <>
                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <span className="mr-1 text-lg text-orange-500">Hey,</span>
                  {payload.name}
                </motion.div>
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link
                      className="text-gray-600 capitalize hover:text-gray-800"
                      to="search-course"
                    >
                      Search Course
                    </Link>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div
                    onClick={toggleModal}
                    className="text-gray-600 capitalize hover:text-gray-800"
                  >
                    Edit Profile
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <MdLogout
                    onClick={handleLogout}
                    className="text-red-400 w-7 h-7 hover:text-red-600 hover:cursor-pointer"
                  />
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link className="hover:text-gray-800" to="login">
                  Login
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      )}
      {/* EditProfile */}
      <Modal isOpenModal={isModalOpen}>
        <EditProfile toggleModal={toggleModal} />
      </Modal>
    </motion.nav>
  );
};

export default Navbar;
