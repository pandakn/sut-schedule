import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// components
import Modal from "./Modal";
import EditProfile from "./EditProfile";

// icons
import { MdLogout } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Logo from "./Logo";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const childrenVariants = {
  initial: { y: -5, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const Navbar = () => {
  const { accessToken, payload, handleLogout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  // hide Navbar when current path is admin/*
  const hideNavbar = /^\/admin(\/|$)/.test(location.pathname);

  const toggleMenu = () => setIsShowMenu(!isShowMenu);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleMenuNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {!hideNavbar && (
        <motion.nav className="bg-white shadow-lg sticky-navbar">
          <div className="container px-5 mx-auto">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center justify-between w-full h-full">
                <div className="w-40">
                  <Logo />
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center gap-6">
                    {accessToken ? (
                      <>
                        {payload.role === "admin" && (
                          <Link
                            className="text-gray-600 capitalize hover:text-gray-800"
                            to="/admin"
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link
                          className="text-gray-600 capitalize hover:text-gray-800"
                          to="/schedule"
                        >
                          Schedule
                        </Link>
                        <Link
                          className="text-gray-600 capitalize hover:text-gray-800"
                          to="/editor"
                        >
                          Write
                        </Link>
                        <Link
                          className="text-gray-600 capitalize hover:text-gray-800"
                          to="/search-course"
                        >
                          Search Course
                        </Link>
                        |
                        <div className="relative">
                          <h3
                            className="hover:cursor-pointer hover:opacity-60 "
                            onClick={toggleMenu}
                          >
                            <span className="mr-1 text-orange-500">Hey,</span>
                            {payload.name}
                          </h3>
                          {isShowMenu && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25 }}
                              onClick={toggleMenu}
                              className="absolute p-1 px-2 bg-white border rounded-md w-28 -left-2 top-8"
                            >
                              <div className="flex flex-col gap-y-2">
                                <div
                                  className="text-gray-600 capitalize hover:bg-white/50 hover:text-gray-950 hover:cursor-pointer"
                                  onClick={toggleModal}
                                >
                                  Edit Profile
                                </div>
                                <Link
                                  to="/posts"
                                  className="text-gray-600 capitalize hover:bg-white/50 hover:text-gray-950 hover:cursor-pointer"
                                >
                                  Posts
                                </Link>
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
                      <>
                        <Link
                          className="text-gray-600 capitalize hover:text-gray-800"
                          to="login"
                        >
                          Login
                        </Link>
                        <Link
                          className="text-gray-600 capitalize hover:text-gray-800"
                          to="register"
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex -mr-2 md:hidden">
                <button
                  onClick={toggleMenuNav}
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
          {/* mobile nav */}
          {isMenuOpen && (
            <div className="md:hidden">
              <motion.div
                initial="initial"
                animate="animate"
                variants={variants}
                transition={{
                  staggerChildren: 0.2,
                }}
                className="container flex flex-col px-5 pb-8 mx-auto gap-y-2"
              >
                {accessToken ? (
                  <>
                    <motion.div variants={childrenVariants}>
                      <span className="mr-1 text-lg text-orange-500">Hey,</span>
                      {payload.name}
                    </motion.div>
                    <motion.div variants={childrenVariants}>
                      <div className="flex flex-col gap-y-1">
                        <Link
                          className="text-gray-600 capitalize hover:text-gray-800"
                          to="/schedule"
                        >
                          Schedule
                        </Link>
                        <Link
                          className="text-gray-600 capitalize hover:text-gray-800"
                          to="/editor"
                        >
                          Write
                        </Link>
                        <Link
                          className="text-gray-600 capitalize hover:text-gray-800"
                          to="search-course"
                        >
                          Search Course
                        </Link>
                      </div>
                    </motion.div>
                    <motion.div variants={childrenVariants}>
                      <div
                        onClick={toggleModal}
                        className="text-gray-600 capitalize hover:text-gray-800"
                      >
                        Edit Profile
                      </div>
                      <Link
                        to="/posts"
                        className="text-gray-600 capitalize hover:text-gray-800"
                      >
                        Posts
                      </Link>
                    </motion.div>
                    <motion.div variants={childrenVariants}>
                      <MdLogout
                        onClick={handleLogout}
                        className="text-red-400 w-7 h-7 hover:text-red-600 hover:cursor-pointer"
                      />
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    variants={childrenVariants}
                    className="flex flex-col gap-y-1"
                  >
                    <Link className="hover:text-gray-800" to="login">
                      Login
                    </Link>
                    <Link className="hover:text-gray-800" to="register">
                      Register
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
          {/* EditProfile */}
          <Modal isOpenModal={isModalOpen}>
            <EditProfile
              setIsModalOpen={setIsModalOpen}
              toggleModal={toggleModal}
            />
          </Modal>
        </motion.nav>
      )}
    </>
  );
};

export default Navbar;
