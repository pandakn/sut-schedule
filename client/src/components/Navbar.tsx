import { useAuth } from "../hooks/useAuth";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const { accessToken, payload } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("payload");
    window.location.reload();
  };

  return (
    <>
      <nav className="container flex items-center justify-center mx-auto my-4">
        <div className="flex flex-col items-center justify-between w-full p-5 mx-5 rounded-lg shadow-lg md:flex-row">
          <Link to="/" className="text-xl uppercase">
            <span className="text-orange-400">Sut</span> Schedule
          </Link>
          <div className="flex items-center justify-center gap-10 mt-4 font-medium text-gray-500 capitalize md:mt-0">
            <Link className="hover:text-gray-800" to="schedule">
              Class Schedule
            </Link>
            <Link className="hover:text-gray-800" to="search-course">
              Search Course
            </Link>
            {accessToken ? (
              <h1
                onClick={handleLogout}
                className="cursor-pointer hover:text-gray-800"
              >
                {payload.name}
              </h1>
            ) : (
              <Link className="hover:text-gray-800" to="login">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
