import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

const Navbar = () => {
  const { accessToken, payload, handleLogout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShowEditProfile, setIsShowEditProfile] = useState(false);

  const toggleProfile = () => setIsShowEditProfile(!isShowEditProfile);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky-navbar">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                        className="hover:cursor-pointer hover:opacity-80"
                        onClick={toggleProfile}
                      >
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
                          <Link
                            className="text-gray-600 capitalize hover:text-gray-800 "
                            to="edit-profile"
                          >
                            Edit Profile
                          </Link>
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
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
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
        <motion.div
          initial={{ y: -16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden"
        >
          <div className="flex flex-col px-5 pt-2 pb-3 gap-y-1 sm:px-3">
            {accessToken ? (
              <>
                <h3 className="text-lg cursor-pointer ">{payload.name}</h3>
                <Link
                  className="text-gray-600 capitalize hover:text-gray-800"
                  to="search-course"
                >
                  Search Course
                </Link>
                <Link
                  className="text-gray-600 capitalize hover:text-gray-800"
                  to="edit-profile"
                >
                  Edit Profile
                </Link>
                <MdLogout
                  onClick={handleLogout}
                  className="text-red-400 w-7 h-7 hover:text-red-600 hover:cursor-pointer"
                />
              </>
            ) : (
              <Link className="hover:text-gray-800" to="login">
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
