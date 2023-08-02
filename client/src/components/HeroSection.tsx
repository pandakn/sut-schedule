import { BsArrowRight } from "react-icons/bs";
import Hero from "/images/7 SCENE.png";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";

const HeroSection = () => {
  const { accessToken } = useAuth();
  const redirect = accessToken ? "/schedule" : "/login";

  return (
    <div className="container mx-auto my-10">
      <div className="flex flex-col items-center p-10 mx-5 rounded-3xl md:flex-row">
        <div className="relative md:w-1/2">
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-orange-100 rounded-full top-1/2 left-24 w-52 h-52 -z-10 blur-xl"></div>
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-red-100 rounded-full top-3/4 left-44 w-52 h-52 -z-10 blur-xl"></div>
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-purple-100 rounded-full top-1/3 left-56 w-52 h-52 -z-10 blur-xl"></div>
          <h1 className="mb-4 text-4xl font-bold lg:text-7xl">
            Welcome to <br />
            <p className="mt-2">
              <span className="mr-4 text-orange-400">SUT</span>
              Schedule
            </p>
          </h1>
          <p className="mb-4 lg:text-xl">
            Unlock Your Academic Potential: The Ultimate Web App for SUT
            Students to Dope-ly Plan Class Schedules & Ace Every Semester!
          </p>
          <button className="px-4 py-2 mt-4 font-bold text-white bg-orange-500 rounded hover:bg-orange-600">
            <Link to={redirect} className="flex items-center">
              Get Started <BsArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </button>
        </div>
        <div className="mt-5 md:w-1/2 md:mt-0">
          <img
            src={Hero}
            alt="Hero Image"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
