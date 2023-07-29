import { useState } from "react";

// icons
import { AiOutlineBook, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Logo from "../Logo";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    // {/* Sidebar */}
    <div
      className={`fixed z-30 lg:relative min-h-screen w-64 bg-white border-r overflow-y-auto transition duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-52"
      } lg:translate-x-0`}
    >
      {/* Sidebar content */}
      <div className="flex items-center justify-between p-4">
        <div className="w-40">
          <Logo />
        </div>
        <button
          className="-mr-1 space-x-10 text-gray-500 hover:text-gray-600 focus:outline-none lg:hidden"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <HiOutlineX className="w-6 h-6" />
          ) : (
            <HiOutlineMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar items */}
      <nav className="px-4 py-2">
        <ul>
          <li>
            <Link
              to="/admin"
              className="flex items-center py-2 text-gray-600 hover:text-gray-800"
            >
              <span className="mr-2">
                <AiOutlineHome className="w-5 h-5" />
              </span>
              <span className="ml-1 text-sm tracking-wide truncate">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-users"
              className="flex items-center py-2 text-gray-600 hover:text-gray-800"
            >
              <span className="mr-2">
                <AiOutlineUser className="w-5 h-5" />
              </span>
              <span className="ml-1 text-sm tracking-wide truncate">Users</span>
            </Link>
            <Link
              to="/admin/manage-blogs"
              className="flex items-center py-2 text-gray-600 hover:text-gray-800"
            >
              <span className="mr-2">
                <AiOutlineBook className="w-5 h-5" />
              </span>
              <span className="ml-1 text-sm tracking-wide truncate">Blogs</span>
            </Link>
          </li>
          {/* Add more sidebar items */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
